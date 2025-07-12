import "./CarroCompras.scss";
import ResumenCompra from "./ResumenCompra";
import { useState, useEffect } from "react";
import ProductoCarrito from "../ProductosCarrito/ProductosCarrito";
import carritoApi from "../../api/carritoApi.js";
import itemCarritoApi from "../../api/itemCarritoApi.js";
import productosApi from "../../api/productoApi.js";
import userApi from "../../api/usuarioApi.js"; 
const CarroCompras = () => {
    const usuarioId = userApi.getUserSession()?.id; // ✅ correcto
    const [itemCarrito, setItemCarrito] = useState([]);
    const [productosEnCarrito, setProductosEnCarrito] = useState([]);

    const handleCarrito = async () => {
        const carrito = await carritoApi.findByUsuario(usuarioId);
        if (carrito) {
            const items = await itemCarritoApi.findByCarrito(carrito.id);
            setItemCarrito(items);
        }
    };

    const handleProductosCarrito = async () => {
        if (!itemCarrito.length) return;

        const productos = await Promise.all(
            itemCarrito.map(async (item) => {
                const producto = await productosApi.findOne(item.idProducto);
                return {
                    ...producto,
                    cantidad: item.cantidad,
                    idItemCarrito: item.id 
                };
            })
        );

        setProductosEnCarrito(productos);
    };

    useEffect(() => {
        handleCarrito();
    }, []);

    useEffect(() => {
        handleProductosCarrito();
    }, [itemCarrito]);

    const cambiarCantidad = async (idItemCarrito, idProducto, op) => {
        const nuevosProductos = productosEnCarrito.map((p) => {
            if (p.id === idProducto) {
                const nuevaCantidad = Math.max(p.cantidad + op, 1);
                itemCarritoApi.update({
                    id: idItemCarrito,
                    cantidad: nuevaCantidad
                });
                return { ...p, cantidad: nuevaCantidad };
            }
            return p;
        });

        setProductosEnCarrito(nuevosProductos);
    };
    const eliminarProducto = async (idItemCarrito) => {
        await itemCarritoApi.remove(idItemCarrito);

        // Actualiza el estado local quitando ese producto
        const nuevosProductos = productosEnCarrito.filter(p => p.idItemCarrito !== idItemCarrito);
        setProductosEnCarrito(nuevosProductos);
    };
    const subtotal = productosEnCarrito.reduce((suma, producto) => {
        return suma + producto.precio * producto.cantidad;
    }, 0);

    const cantidadTotal = productosEnCarrito.reduce((suma, producto) => {
        return suma + producto.cantidad;
    }, 0);

    const descuento = subtotal * 0.10;
    const total = subtotal - descuento;
    
    localStorage.setItem("resumen", JSON.stringify({
        subtotal,
        descuento,
        total,
        cantidadTotal,
        productos: productosEnCarrito
    }));

    return (
        <div className="carro-compras">
            <div className="carro">
                <div className="titulo">
                    <h1>Compra</h1>
                    <p>({cantidadTotal} productos)</p>
                </div>

               <div className={`productos-carrito ${productosEnCarrito.length === 0 ? 'vacio' : ''}`}>
                    {productosEnCarrito.length === 0 ? (
                        <p className="carrito-vacio">Tu carrito está vacío 🛒</p>
                    ) : (
                        productosEnCarrito.map((producto) => (
                        <ProductoCarrito
                            key={producto.id}
                            producto={producto}
                            cantidad={producto.cantidad}
                            cambiarCantidad={(op) =>
                            cambiarCantidad(producto.idItemCarrito, producto.id, op)
                            }
                            eliminarItem={() => eliminarProducto(producto.idItemCarrito)} // ✅
                            soloLectura={false}
                        />
                        ))
                    )}
                    </div>

            </div>

            {productosEnCarrito.length > 0 && <ResumenCompra modo="Continuar compra" />}
        </div>
    );
};

export default CarroCompras;
