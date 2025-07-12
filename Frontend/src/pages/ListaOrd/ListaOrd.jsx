import React, { useState, useEffect } from "react";
import "./ListaOrd.scss";
import ordenApi from "../../api/ordenApi.js";
import userApi from "../../api/usuarioApi.js";

function ListaOrd() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const ordersPerPage = 10;

    // Cargar datos iniciales
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Cargar órdenes y usuarios en paralelo
                const [ordenesData, usuariosData] = await Promise.all([
                    ordenApi.findAll(),
                    userApi.findAll()
                ]);

                // Crear un mapa de usuarios para acceso rápido
                const usersMap = {};
                usuariosData.forEach(user => {
                    usersMap[user.id] = user;
                });

                // Combinar datos de órdenes con información de usuarios
                const ordersWithUsers = ordenesData.map(orden => ({
                    ...orden,
                    user: usersMap[orden.idUsuario] || null
                }));

                setOrders(ordersWithUsers);
                setUsers(usuariosData);
                setFilteredOrders(ordersWithUsers);
                setTotalPages(Math.ceil(ordersWithUsers.length / ordersPerPage));

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error al cargar los datos de órdenes');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    
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
            const filtered = orders.filter(order => {
                const userName = order.user ? `${order.user.nombre} ${order.user.apellido}` : '';
                const orderId = order.id.toString();
                
                return userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       orderId.includes(searchTerm) ||
                       (order.user && order.user.correo.toLowerCase().includes(searchTerm.toLowerCase()));
            });
            setFilteredOrders(filtered);
        }
        setCurrentPage(1); // Resetear a la primera página al buscar
        setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));
    };

    // Ver detalles
    const viewDetails = (orderId, userName) => {
        // Implementar navegación o modal para ver detalles
        console.log(`Ver detalles de la orden ${orderId} de ${userName}`);
        // navigate(`/orden-detalle/${orderId}`);
    };

    // Cambiar estado de orden
    const toggleOrderStatus = async (orderId) => {
        try {
            const order = orders.find(o => o.id === orderId);
            if (!order) return;

            const newStatus = order.estado === 'Entregado' ? 'Por entregar' : 'Entregado';
            
            // Actualizar en la API
            await ordenApi.update({
                id: orderId,
                estado: newStatus
            });

            // Actualizar estado local
            const updatedOrders = orders.map(o => 
                o.id === orderId ? { ...o, estado: newStatus } : o
            );
            
            setOrders(updatedOrders);
            
            // Refiltrar
            searchOrders();
            
        } catch (err) {
            console.error('Error updating order status:', err);
            alert('Error al actualizar el estado de la orden');
        }
    };

    
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // Obtener órdenes de la página actual
    const getCurrentPageOrders = () => {
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        return filteredOrders.slice(startIndex, endIndex);
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE');
    };

    // Formatear moneda
    const formatCurrency = (amount) => {
        return `S/${parseFloat(amount).toFixed(2)}`;
    };

    // Generar botones de paginación
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={currentPage === i ? 'active' : ''}
                        onClick={() => goToPage(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Mostrar primera página
            buttons.push(
                <button
                    key={1}
                    className={currentPage === 1 ? 'active' : ''}
                    onClick={() => goToPage(1)}
                >
                    1
                </button>
            );

            // Puntos suspensivos si es necesario
            if (currentPage > 3) {
                buttons.push(<span key="dots1" className="dots">...</span>);
            }

            // Páginas alrededor de la actual
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (i !== 1 && i !== totalPages) {
                    buttons.push(
                        <button
                            key={i}
                            className={currentPage === i ? 'active' : ''}
                            onClick={() => goToPage(i)}
                        >
                            {i}
                        </button>
                    );
                }
            }

            // Puntos suspensivos si es necesario
            if (currentPage < totalPages - 2) {
                buttons.push(<span key="dots2" className="dots">...</span>);
            }

            // Última página
            if (totalPages > 1) {
                buttons.push(
                    <button
                        key={totalPages}
                        className={currentPage === totalPages ? 'active' : ''}
                        onClick={() => goToPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return buttons;
    };

    
    useEffect(() => {
        if (orders.length > 0) {
            searchOrders();
        }
    }, [searchTerm, orders]);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Cargando órdenes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Listado de órdenes</h1>

            <div className="search-section">
                <input 
                    type="text" 
                    className="user-search" 
                    placeholder="Buscar por usuario, orden o correo..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-user-btn" onClick={searchOrders}>
                    Buscar
                </button>
            </div>

            <div className="orders-summary">
                <p>
                    Mostrando {getCurrentPageOrders().length} de {filteredOrders.length} órdenes
                    {searchTerm && ` (filtradas de ${orders.length} total)`}
                </p>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="no-orders">
                    <p>No se encontraron órdenes.</p>
                </div>
            ) : (
                <>
                    <table className="users-table">
                        <thead>
                            <tr className="table-header">
                                <th>#ORDEN</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Fecha de Orden</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentPageOrders().map((order) => (
                                <tr className="user-row" key={order.id}>
                                    <td className="order-id">#{order.id}</td>
                                    <td className="user-info-cell">
                                        <div className="user-name">
                                            {order.user 
                                                ? `${order.user.nombre} ${order.user.apellido}`
                                                : 'Usuario no encontrado'
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        {order.user 
                                            ? order.user.correo
                                            : 'N/A'
                                        }
                                    </td>
                                    <td>{formatDate(order.fecha)}</td>
                                    <td className="order-total">{formatCurrency(order.total)}</td>
                                    <td>
                                        <span className={`status ${order.estado?.toLowerCase().replace(/\s+/g, '-') || 'pendiente'}`}>
                                            {order.estado || 'Pendiente'}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button 
                                            className="action-btn details-btn" 
                                            onClick={() => viewDetails(
                                                order.id, 
                                                order.user ? `${order.user.nombre} ${order.user.apellido}` : 'Usuario desconocido'
                                            )}
                                        >
                                            Ver detalles
                                        </button>
                                        <button 
                                            className="action-btn status-btn" 
                                            onClick={() => toggleOrderStatus(order.id)}
                                        >
                                            {order.estado === 'Entregado' ? 'Marcar pendiente' : 'Marcar entregado'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                onClick={previousPage}
                                disabled={currentPage === 1}
                            >
                                ←
                            </button>
                            
                            {getPaginationButtons()}
                            
                            <button 
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ListaOrd;