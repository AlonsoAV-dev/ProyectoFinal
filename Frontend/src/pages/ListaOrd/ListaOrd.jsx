import React, { useState, useEffect } from "react";
import "./ListaOrd.scss";

function ListaOrd() {
    const [orders, setOrders] = useState([
        { id: '#1234', user: 'Juan Perez', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Maria Gonzales', date: '20/01/2025', total: 'S/199.00', status: 'por entregar' },
        { id: '#1234', user: 'Marco Aurelio', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Ana Dias', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Juan Perez', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Maria Gonzales', date: '20/01/2025', total: 'S/199.00', status: 'por entregar' },
        { id: '#1234', user: 'Marco Aurelio', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Ana Dias', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Juan Perez', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
        { id: '#1234', user: 'Maria Gonzales', date: '20/01/2025', total: 'S/199.00', status: 'por entregar' },
        { id: '#1234', user: 'Marco Aurelio', date: '20/01/2025', total: 'S/199.00', status: 'entregado' },
    ]);
    
    const [filteredOrders, setFilteredOrders] = useState([...orders]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Buscar órdenes
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

    // Ver detalles
    const viewDetails = (orderId, userName) => {
        alert(`Ver detalles de la orden ${orderId} de ${userName}`);
    };

    // Cambiar estado de orden
    const toggleOrderStatus = (orderId, userName) => {
        const updatedOrders = orders.map(order => 
            order.id === orderId && order.user === userName
                ? { ...order, status: order.status === 'entregado' ? 'por entregar' : 'entregado' } 
                : order
        );
        setOrders(updatedOrders);
        searchOrders(); // Refiltrar
    };

    // Paginación
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < 10) setCurrentPage(currentPage + 1);
    };

    // Efecto para búsqueda
    useEffect(() => {
        searchOrders();
    }, [searchTerm, orders]);

    return (
        <>
            <div className="container">
                <h1>Listado de órdenes</h1>

                <div className="search-section">
                    <input 
                        type="text" 
                        className="user-search" 
                        placeholder="Buscar una orden..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-user-btn">Buscar</button>
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
                        {filteredOrders.map((order, index) => (
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
                                </td>
                            </tr>
                        ))}
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