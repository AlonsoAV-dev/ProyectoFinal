import React, { useState, useEffect } from "react";
import "./ListaOrd.scss";
import ordenApi from "../../api/ordenApi.js";

function ListaOrd() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        cargarOrdenes();
    }, []);

    const cargarOrdenes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const resultado = await ordenApi.findAll();
            
            if (Array.isArray(resultado)) {
               
                const ordenesFormateadas = resultado.map(orden => ({
                    id: `#${orden.id}`,
                    originalId: orden.id,
                    user: `Usuario ${orden.idUsuario}`,
                    date: new Date(orden.fecha).toLocaleDateString('es-ES'),
                    total: `S/${orden.total}`,
                    status: orden.estado.toLowerCase() === 'entregado' ? 'entregado' : 'por entregar',
                    originalStatus: orden.estado
                }));
                
                setOrders(ordenesFormateadas);
                setFilteredOrders(ordenesFormateadas);
            } else {
                setError('Error al cargar órdenes desde el servidor');
            }
        } catch (error) {
            setError('Error de conexión con el servidor');
            console.error('Error al cargar órdenes:', error);
            
            
            const dummyOrders = [
                { id: '#1234', user: 'Juan Perez', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
                { id: '#1235', user: 'Maria Gonzales', date: '20/01/2025', total: 'S/159.00', status: 'por entregar' },
                { id: '#1236', user: 'Marco Aurelio', date: '19/01/2025', total: 'S/289.00', status: 'entregado' }
            ];
            setOrders(dummyOrders);
            setFilteredOrders(dummyOrders);
        } finally {
            setLoading(false);
        }
    };

    
    const searchOrders = () => {
        if (searchTerm === '') {
            setFilteredOrders([...orders]);
        } else {
            const filtered = orders.filter(order => 
                order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(filtered);
        }
    };

  
    const viewDetails = async (orderId, userName) => {
        try {
            const originalId = orderId.replace('#', '');
            const detalles = await ordenApi.findOneWithDetails(originalId);
            
            if (detalles) {
                alert(`Detalles de la orden ${orderId}:\n` +
                      `Usuario: ${userName}\n` +
                      `Total: S/${detalles.total}\n` +
                      `Estado: ${detalles.estado}\n` +
                      `Fecha: ${new Date(detalles.fecha).toLocaleDateString()}`);
            } else {
                alert(`Ver detalles de la orden ${orderId} de ${userName}`);
            }
        } catch (error) {
            alert(`Ver detalles de la orden ${orderId} de ${userName}`);
        }
    };

    
    const toggleOrderStatus = async (orderId, userName) => {
        try {
            const originalId = orderId.replace('#', '');
            const orderIndex = orders.findIndex(order => order.id === orderId && order.user === userName);
            
            if (orderIndex === -1) return;
            
            const currentOrder = orders[orderIndex];
            const newStatus = currentOrder.status === 'entregado' ? 'Pendiente' : 'Entregado';
            
            
            const resultado = await ordenApi.cambiarEstadoOrden(originalId, newStatus);
            
            if (resultado.success) {
                
                const updatedOrders = [...orders];
                updatedOrders[orderIndex] = {
                    ...currentOrder,
                    status: newStatus.toLowerCase() === 'entregado' ? 'entregado' : 'por entregar',
                    originalStatus: newStatus
                };
                
                setOrders(updatedOrders);
                searchOrders(); 
                
                alert(`Estado actualizado: ${newStatus}`);
            } else {
                alert(`Error al actualizar estado: ${resultado.message}`);
            }
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            alert('Error de conexión al cambiar estado');
        }
    };

    
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < 10) setCurrentPage(currentPage + 1);
    };

    
    useEffect(() => {
        searchOrders();
    }, [searchTerm, orders]);

    
    if (loading) {
        return (
            <div className="container">
                <h1>Listado de órdenes</h1>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p>Cargando órdenes...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <h1>Listado de órdenes</h1>

                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <div className="search-section">
                    <input 
                        type="text" 
                        className="user-search" 
                        placeholder="Buscar una orden..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-user-btn" onClick={searchOrders}>Buscar</button>
                    <button 
                        className="search-user-btn" 
                        onClick={cargarOrdenes}
                        style={{ marginLeft: '10px', backgroundColor: '#28a745' }}
                    >
                        🔄 Actualizar
                    </button>
                </div>

                <table className="users-table">
                    <thead>
                        <tr className="table-header">
                            <th>#ORDEN</th>
                            <th>Usuario</th>
                            <th>Fecha de Orden</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                    No se encontraron órdenes
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order, index) => (
                                <tr className="user-row" key={`${order.id}-${order.user}-${index}`}>
                                    <td className="order-id">{order.id}</td>
                                    <td className="user-info-cell">
                                        <div className="user-name">{order.user}</div>
                                    </td>
                                    <td>{order.date}</td>
                                    <td className="order-total">{order.total}</td>
                                    <td>
                                        <span className={`status ${order.status}`}>
                                            {order.status === 'entregado' ? 'Entregado' : 'Por entregar'}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button 
                                            className="action-btn details-btn" 
                                            onClick={() => viewDetails(order.id, order.user)}
                                        >
                                            Ver detalles
                                        </button>
                                        <button 
                                            className="action-btn" 
                                            onClick={() => toggleOrderStatus(order.id, order.user)}
                                            style={{ 
                                                marginLeft: '5px',
                                                backgroundColor: order.status === 'entregado' ? '#ffc107' : '#28a745'
                                            }}
                                        >
                                            {order.status === 'entregado' ? 'Marcar pendiente' : 'Marcar entregado'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={previousPage}>←</button>
                    <button className={currentPage === 1 ? 'active' : ''} onClick={() => setCurrentPage(1)}>1</button>
                    <button className={currentPage === 2 ? 'active' : ''} onClick={() => setCurrentPage(2)}>2</button>
                    <button className={currentPage === 3 ? 'active' : ''} onClick={() => setCurrentPage(3)}>3</button>
                    <span className="dots">...</span>
                    <button className={currentPage === 10 ? 'active' : ''} onClick={() => setCurrentPage(10)}>10</button>
                    <button onClick={nextPage}>→</button>
                </div>
            </div>
        </>
    );
}

export default ListaOrd;