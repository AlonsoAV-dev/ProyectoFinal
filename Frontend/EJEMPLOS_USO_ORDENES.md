# 🎯 Ejemplos de Uso - API de Órdenes Frontend

## 🚀 **Cómo usar las funciones de orden en React**

### **1. 🛒 Crear Orden desde Carrito (Checkout)**

```javascript
import React, { useState } from 'react';
import ordenApi from '../api/ordenApi.js';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleFinalizarCompra = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Obtener ID del usuario desde localStorage o contexto
            const idUsuario = localStorage.getItem('userId') || 14;
            
            // Datos del formulario de checkout
            const datosOrden = {
                metodoDeEntrega: 'Delivery',
                nroTarjeta: '4111111111111111',
                tipoTarjeta: 'Visa'
            };
            
            // Crear orden usando la función conveniente
            const resultado = await ordenApi.crearOrdenCompleta(
                idUsuario, 
                datosOrden.metodoDeEntrega, 
                datosOrden.nroTarjeta, 
                datosOrden.tipoTarjeta
            );
            
            if (resultado.success) {
                // Orden creada exitosamente
                console.log('Orden creada:', resultado.orden);
                
                // Guardar detalles para página de confirmación
                localStorage.setItem('ultimaOrden', JSON.stringify(resultado));
                
                // Redirigir a página de confirmación
                window.location.href = '/orden-completada';
            } else {
                // Error al crear orden
                setError(resultado.message);
                
                // Mostrar errores específicos
                if (resultado.errors && resultado.errors.length > 0) {
                    resultado.errors.forEach(error => console.error(error));
                }
            }
        } catch (error) {
            setError('Error de conexión. Intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {/* ... formulario de checkout ... */}
            
            {error && (
                <div style={{color: 'red', marginTop: '10px'}}>
                    {error}
                </div>
            )}
            
            <button 
                onClick={handleFinalizarCompra}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Procesando...' : 'Finalizar Compra'}
            </button>
        </div>
    );
};

export default Checkout;
```

### **2. 📋 Lista de Órdenes (Admin)**

```javascript
import React, { useState, useEffect } from 'react';
import ordenApi from '../api/ordenApi.js';

const ListaOrdenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Cargar órdenes al iniciar
    useEffect(() => {
        cargarOrdenes();
    }, []);
    
    const cargarOrdenes = async () => {
        try {
            setLoading(true);
            const resultado = await ordenApi.findAll();
            
            if (Array.isArray(resultado)) {
                setOrdenes(resultado);
            } else {
                setError('Error al cargar órdenes');
            }
        } catch (error) {
            setError('Error de conexión');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const cambiarEstado = async (idOrden, nuevoEstado) => {
        try {
            const resultado = await ordenApi.cambiarEstadoOrden(idOrden, nuevoEstado);
            
            if (resultado.success) {
                // Actualizar la lista local
                setOrdenes(ordenes.map(orden => 
                    orden.id === idOrden 
                        ? { ...orden, estado: nuevoEstado }
                        : orden
                ));
                
                alert(resultado.message);
            } else {
                alert(resultado.message);
            }
        } catch (error) {
            alert('Error al actualizar estado');
            console.error('Error:', error);
        }
    };
    
    if (loading) return <div>Cargando órdenes...</div>;
    if (error) return <div style={{color: 'red'}}>{error}</div>;
    
    return (
        <div>
            <h1>Lista de Órdenes</h1>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{backgroundColor: '#f5f5f5'}}>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>ID</th>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>Usuario</th>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>Fecha</th>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>Total</th>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>Estado</th>
                        <th style={{padding: '10px', border: '1px solid #ddd'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map(orden => (
                        <tr key={orden.id}>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>#{orden.id}</td>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>{orden.idUsuario}</td>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                {new Date(orden.fecha).toLocaleDateString()}
                            </td>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>S/ {orden.total}</td>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                <span style={{
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    backgroundColor: orden.estado === 'Entregado' ? '#d4edda' : '#fff3cd',
                                    color: orden.estado === 'Entregado' ? '#155724' : '#856404'
                                }}>
                                    {orden.estado}
                                </span>
                            </td>
                            <td style={{padding: '10px', border: '1px solid #ddd'}}>
                                <select 
                                    value={orden.estado} 
                                    onChange={(e) => cambiarEstado(orden.id, e.target.value)}
                                    style={{padding: '5px', marginRight: '10px'}}
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Procesando">Procesando</option>
                                    <option value="Entregado">Entregado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaOrdenes;
```

### **3. 🧮 Validar Stock en Carrito**

```javascript
import React, { useState, useEffect } from 'react';
import ordenApi from '../api/ordenApi.js';

const CarritoCompras = () => {
    const [productos, setProductos] = useState([]);
    const [stockValido, setStockValido] = useState(true);
    const [erroresStock, setErroresStock] = useState([]);
    const [totales, setTotales] = useState(null);
    
    // Cargar productos del carrito desde localStorage
    useEffect(() => {
        const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        setProductos(productosCarrito);
        
        if (productosCarrito.length > 0) {
            verificarStock(productosCarrito);
            calcularTotales(productosCarrito);
        }
    }, []);
    
    const verificarStock = async (productosCarrito) => {
        try {
            const resultado = await ordenApi.verificarStockDisponible(productosCarrito);
            
            setStockValido(resultado.disponible);
            setErroresStock(resultado.errores || []);
            
            if (!resultado.disponible) {
                console.log('Stock insuficiente:', resultado.errores);
            }
        } catch (error) {
            console.error('Error al verificar stock:', error);
        }
    };
    
    const calcularTotales = async (productosCarrito) => {
        try {
            const resultado = await ordenApi.calcularTotalesCarrito(productosCarrito);
            
            if (resultado.success) {
                setTotales(resultado);
                
                // Guardar en localStorage para ResumenCompra
                localStorage.setItem('resumen', JSON.stringify({
                    subtotal: resultado.subtotal,
                    impuestos: resultado.impuestos,
                    total: resultado.total,
                    cantidadTotal: productosCarrito.reduce((total, prod) => total + prod.cantidad, 0),
                    descuento: 0 // Si tienes descuentos
                }));
            } else {
                console.error('Error al calcular totales:', resultado.message);
            }
        } catch (error) {
            console.error('Error al calcular totales:', error);
        }
    };
    
    return (
        <div>
            <h1>Carrito de Compras</h1>
            
            {/* Mostrar errores de stock */}
            {!stockValido && (
                <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '15px',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    <h3>⚠️ Stock Insuficiente</h3>
                    <ul>
                        {erroresStock.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Lista de productos */}
            <div>
                {productos.map(producto => (
                    <div key={producto.id} style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        marginBottom: '10px'
                    }}>
                        <h3>{producto.nombre}</h3>
                        <p>Precio: S/ {producto.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Total: S/ {(producto.precio * producto.cantidad).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            
            {/* Totales */}
            {totales && (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '5px',
                    marginTop: '20px'
                }}>
                    <h3>Resumen de Compra</h3>
                    <p>Subtotal: S/ {totales.subtotal}</p>
                    <p>Impuestos (18%): S/ {totales.impuestos}</p>
                    <p><strong>Total: S/ {totales.total}</strong></p>
                </div>
            )}
            
            {/* Botón de checkout */}
            <button 
                disabled={!stockValido}
                style={{
                    backgroundColor: stockValido ? '#28a745' : '#dc3545',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '20px',
                    cursor: stockValido ? 'pointer' : 'not-allowed'
                }}
                onClick={() => window.location.href = '/checkout'}
            >
                {stockValido ? 'Proceder al Checkout' : 'Stock Insuficiente'}
            </button>
        </div>
    );
};

export default CarritoCompras;
```

### **4. 📊 Dashboard de Estadísticas (Admin)**

```javascript
import React, { useState, useEffect } from 'react';
import ordenApi from '../api/ordenApi.js';

const DashboardAdmin = () => {
    const [estadisticas, setEstadisticas] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        cargarEstadisticas();
    }, []);
    
    const cargarEstadisticas = async () => {
        try {
            const resultado = await ordenApi.getEstadisticas();
            setEstadisticas(resultado);
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div>Cargando estadísticas...</div>;
    
    return (
        <div>
            <h1>Dashboard de Ventas</h1>
            
            {estadisticas && (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
                    <div style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>{estadisticas.totalOrdenes}</h2>
                        <p>Total de Órdenes</p>
                    </div>
                    
                    <div style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>{estadisticas.ordenesEntregadas}</h2>
                        <p>Órdenes Entregadas</p>
                    </div>
                    
                    <div style={{
                        backgroundColor: '#ffc107',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>{estadisticas.ordenesPendientes}</h2>
                        <p>Órdenes Pendientes</p>
                    </div>
                    
                    <div style={{
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>S/ {estadisticas.ventasTotal}</h2>
                        <p>Ventas Totales</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardAdmin;
```

### **5. 🔍 Mis Órdenes (Usuario)**

```javascript
import React, { useState, useEffect } from 'react';
import ordenApi from '../api/ordenApi.js';

const MisOrdenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        cargarMisOrdenes();
    }, []);
    
    const cargarMisOrdenes = async () => {
        try {
            const idUsuario = localStorage.getItem('userId') || 14;
            const resultado = await ordenApi.findByUsuario(idUsuario);
            
            if (Array.isArray(resultado)) {
                setOrdenes(resultado);
            }
        } catch (error) {
            console.error('Error al cargar mis órdenes:', error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div>Cargando tus órdenes...</div>;
    
    return (
        <div>
            <h1>Mis Órdenes</h1>
            
            {ordenes.length === 0 ? (
                <div style={{textAlign: 'center', padding: '50px'}}>
                    <h3>No tienes órdenes aún</h3>
                    <p>¡Comienza a comprar para ver tus órdenes aquí!</p>
                </div>
            ) : (
                <div>
                    {ordenes.map(orden => (
                        <div key={orden.id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '20px',
                            marginBottom: '20px'
                        }}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                    <h3>Orden #{orden.id}</h3>
                                    <p>Fecha: {new Date(orden.fecha).toLocaleDateString()}</p>
                                    <p>Total: S/ {orden.total}</p>
                                </div>
                                <div>
                                    <span style={{
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        backgroundColor: orden.estado === 'Entregado' ? '#d4edda' : '#fff3cd',
                                        color: orden.estado === 'Entregado' ? '#155724' : '#856404'
                                    }}>
                                        {orden.estado}
                                    </span>
                                </div>
                            </div>
                            
                            <div style={{marginTop: '15px'}}>
                                <p><strong>Método de entrega:</strong> {orden.metodoDeEntrega}</p>
                                {orden.nroTarjeta && (
                                    <p><strong>Tarjeta:</strong> **** **** **** {orden.nroTarjeta.slice(-4)}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MisOrdenes;
```

---

## 🎯 **Resumen de Funciones Disponibles**

### **✅ Para usar en cualquier componente:**
```javascript
import ordenApi from '../api/ordenApi.js';

// Crear orden desde carrito
const orden = await ordenApi.crearOrdenCompleta(idUsuario, 'Delivery', '4111111111111111', 'Visa');

// Cambiar estado de orden
const resultado = await ordenApi.cambiarEstadoOrden(idOrden, 'Entregado');

// Verificar stock
const stock = await ordenApi.verificarStockDisponible(productos);

// Calcular totales
const totales = await ordenApi.calcularTotalesCarrito(productos);

// Obtener estadísticas
const stats = await ordenApi.getEstadisticas();
```

### **🔧 Estados de orden disponibles:**
- `Pendiente` - Orden recién creada
- `Procesando` - Orden en preparación
- `Entregado` - Orden completada
- `Cancelado` - Orden cancelada

### **📋 Datos que devuelve createFromCarrito:**
```javascript
{
  success: true,
  orden: { id: 25, idUsuario: 14, total: 95.40, estado: 'Pendiente' },
  detalles: {
    productos: [...],
    subtotal: 80.85,
    impuestos: 14.55,
    total: 95.40
  }
}
```

¡Ahora el frontend está completamente preparado para usar todas las funcionalidades de órdenes! 🚀 