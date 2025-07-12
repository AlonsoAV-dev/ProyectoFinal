import RepositoryBase from './base.js';
import Orden from '../models/orden.js';
import Producto from '../models/producto.js';
import ItemCarrito from '../models/itemCarrito.js';
import Carrito from '../models/carrito.js';
import User from '../models/user.js';

class OrdenRepository extends RepositoryBase {
    constructor() {
        super(Orden);
    }

    async findByUsuario(idUsuario) {
        try {
            return await this.model.findAll({
            where: { idUsuario },
                include: [
                    {
                        model: User,
                        attributes: ['nombre', 'apellido', 'correo']
                    }
                ],
                order: [['fecha', 'DESC']]
            });
        } catch (error) {
                console.error("Error in findByUsuario:", error);
                return null;
        }
    }

    async findOneWithDetails(id) {
        try {
            return await this.model.findOne({
                where: { id },
                include: [
                    {
                        model: User,
                        attributes: ['nombre', 'apellido', 'correo', 'direccion', 'telefono']
                    }
                ]
            });
        } catch (error) {
            console.error("Error in findOneWithDetails:", error);
            return null;
        }
    }

    async validateStock(productosOrden) {
        try {
            const validationErrors = [];
            
            for (const item of productosOrden) {
                const producto = await Producto.findByPk(item.idProducto);
                
                if (!producto) {
                    validationErrors.push(`Producto con ID ${item.idProducto} no encontrado`);
                    continue;
                }
                
                if (producto.stock < item.cantidad) {
                    validationErrors.push(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}, Solicitado: ${item.cantidad}`);
                }
            }
            
            return {
                valid: validationErrors.length === 0,
                errors: validationErrors
            };
        } catch (error) {
            console.error("Error in validateStock:", error);
            return { valid: false, errors: ["Error al validar stock"] };
        }
    }

    async calculateTotals(productosOrden) {
        try {
            let subtotal = 0;
            const productosDetalle = [];
            
            for (const item of productosOrden) {
                const producto = await Producto.findByPk(item.idProducto);
                
                if (producto) {
                    const totalItem = producto.precio * item.cantidad;
                    subtotal += totalItem;
                    
                    productosDetalle.push({
                        ...item,
                        precio: producto.precio,
                        nombre: producto.nombre,
                        totalItem: totalItem
                    });
                }
            }
            
            // Calcular impuestos o descuentos si es necesario
            const impuestos = subtotal * 0.18; // 18% IGV en Perú
            const total = subtotal + impuestos;
            
            return {
                subtotal: parseFloat(subtotal.toFixed(2)),
                impuestos: parseFloat(impuestos.toFixed(2)),
                total: parseFloat(total.toFixed(2)),
                productosDetalle
            };
        } catch (error) {
            console.error("Error in calculateTotals:", error);
            return null;
        }
    }

    async createOrdenFromCarrito(idUsuario, datosOrden) {
        try {
            // Obtener el carrito del usuario
            const carrito = await Carrito.findOne({
                where: { idUsuario },
                include: [
                    {
                        model: ItemCarrito,
                        include: [
                            {
                                model: Producto,
                                attributes: ['id', 'nombre', 'precio', 'stock']
                            }
                        ]
                    }
                ]
            });

            if (!carrito || !carrito.ItemCarritos || carrito.ItemCarritos.length === 0) {
                return { success: false, message: "Carrito vacío" };
            }

            // Preparar productos para validación
            const productosOrden = carrito.ItemCarritos.map(item => ({
                idProducto: item.idProducto,
                cantidad: item.cantidad
            }));

            // Validar stock
            const stockValidation = await this.validateStock(productosOrden);
            if (!stockValidation.valid) {
                return { success: false, message: "Stock insuficiente", errors: stockValidation.errors };
            }

            // Calcular totales
            const totals = await this.calculateTotals(productosOrden);
            if (!totals) {
                return { success: false, message: "Error al calcular totales" };
            }

            // Crear la orden
            const nuevaOrden = await this.model.create({
                idUsuario,
                fecha: new Date(),
                total: totals.total,
                subTotal: totals.subtotal,
                metodoDeEntrega: datosOrden.metodoDeEntrega || 'Delivery',
                nroTarjeta: datosOrden.nroTarjeta,
                tipoTarjeta: datosOrden.tipoTarjeta,
                estado: 'Pendiente'
            });

            // Reducir stock de productos
            await this.updateStock(productosOrden, 'reduce');

            // Limpiar el carrito
            await ItemCarrito.destroy({ where: { idCarrito: carrito.id } });

            return {
                success: true,
                orden: nuevaOrden,
                detalles: {
                    productos: totals.productosDetalle,
                    subtotal: totals.subtotal,
                    impuestos: totals.impuestos,
                    total: totals.total
                }
            };
        } catch (error) {
            console.error("Error in createOrdenFromCarrito:", error);
            return { success: false, message: "Error al crear la orden" };
        }
    }

    async updateStock(productosOrden, operation = 'reduce') {
        try {
            for (const item of productosOrden) {
                const producto = await Producto.findByPk(item.idProducto);
                
                if (producto) {
                    let nuevoStock;
                    
                    if (operation === 'reduce') {
                        nuevoStock = producto.stock - item.cantidad;
                    } else if (operation === 'restore') {
                        nuevoStock = producto.stock + item.cantidad;
                    }
                    
                    await producto.update({ stock: nuevoStock });
                }
            }
            
            return true;
        } catch (error) {
            console.error("Error in updateStock:", error);
            return false;
        }
    }

    async updateEstado(id, nuevoEstado) {
        try {
            const estadosValidos = ['Pendiente', 'Procesando', 'Entregado', 'Cancelado'];
            
            if (!estadosValidos.includes(nuevoEstado)) {
                return { success: false, message: "Estado no válido" };
            }
            
            const orden = await this.model.findByPk(id);
            if (!orden) {
                return { success: false, message: "Orden no encontrada" };
            }
            
            await orden.update({ estado: nuevoEstado });
            
            return { success: true, orden };
        } catch (error) {
            console.error("Error in updateEstado:", error);
            return { success: false, message: "Error al actualizar estado" };
        }
    }

    async getEstadisticas() {
        try {
            const totalOrdenes = await this.model.count();
            const ordenesEntregadas = await this.model.count({ where: { estado: 'Entregado' } });
            const ordenesPendientes = await this.model.count({ where: { estado: 'Pendiente' } });
            const ventasTotal = await this.model.sum('total');
            
            return {
                totalOrdenes,
                ordenesEntregadas,
                ordenesPendientes,
                ventasTotal: parseFloat(ventasTotal || 0).toFixed(2)
            };
        } catch (error) {
            console.error("Error in getEstadisticas:", error);
            return null;
        }
    }
}

export default new OrdenRepository();