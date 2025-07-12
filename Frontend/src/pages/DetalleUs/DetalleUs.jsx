import React, { useState, useEffect } from 'react';
import "./DetalleUs.scss";
import Usuario from "../../assets/Usuario.png";
import ordenApi from "../../api/ordenApi.js";
import usuarioApi from "../../api/usuarioApi.js"; 

function DetalleUs({ userId }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [usuario, setUsuario] = useState(null);
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const ordersPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const usuarioData = await usuarioApi.findOne(userId);
                setUsuario(usuarioData);
                const ordenesData = await ordenApi.findByUsuario(userId);
                setOrdenes(ordenesData);
                setTotalPages(Math.ceil(ordenesData.length / ordersPerPage));

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error al cargar los datos del usuario');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const viewOrderDetails = (orderId) => {
        console.log(`Ver detalles de la orden: ${orderId}`);
        // navigate(`/orden-detalle/${orderId}`);
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };


    const getCurrentPageOrders = () => {
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        return ordenes.slice(startIndex, endIndex);
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE');
    };


    const formatCurrency = (amount) => {
        return `S/${parseFloat(amount).toFixed(2)}`;
    };

    // Generar botones de paginación
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            // Mostrar todos los botones
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={currentPage === i ? 'active' : ''}
                        onClick={() => goToPage(i)}
                        data-page={i}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Lógica para mostrar botones con puntos suspensivos
            buttons.push(
                <button
                    key={1}
                    className={currentPage === 1 ? 'active' : ''}
                    onClick={() => goToPage(1)}
                    data-page={1}
                >
                    1
                </button>
            );

            if (currentPage > 3) {
                buttons.push(<span key="dots1" className="dots">...</span>);
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (i !== 1 && i !== totalPages) {
                    buttons.push(
                        <button
                            key={i}
                            className={currentPage === i ? 'active' : ''}
                            onClick={() => goToPage(i)}
                            data-page={i}
                        >
                            {i}
                        </button>
                    );
                }
            }

            if (currentPage < totalPages - 2) {
                buttons.push(<span key="dots2" className="dots">...</span>);
            }

            if (totalPages > 1) {
                buttons.push(
                    <button
                        key={totalPages}
                        className={currentPage === totalPages ? 'active' : ''}
                        onClick={() => goToPage(totalPages)}
                        data-page={totalPages}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return buttons;
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Cargando datos del usuario...</div>
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

    if (!usuario) {
        return (
            <div className="container">
                <div className="error">Usuario no encontrado</div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Detalles de usuario</h1>
            
            <div className="user-details-card">
                <div className="user-profile">
                    <div className="user-info-section">
                        <h2 className="user-name">{`${usuario.nombre} ${usuario.apellido}`}</h2>
                        <div className="user-detail">
                            <strong>Correo:</strong> 
                            <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a>
                        </div>
                        <div className="user-detail">
                            <strong>Nombre de usuario:</strong> {usuario.nombreDeUsuario}
                        </div>
                        <div className="user-detail">
                            <strong>Teléfono:</strong> {usuario.telefono}
                        </div>
                        <div className="user-detail">
                            <strong>Dirección:</strong> {usuario.direccion}
                        </div>
                        <div className="user-detail">
                            <strong>Ciudad:</strong> {usuario.ciudad}
                        </div>
                        <div className="user-detail">
                            <strong>Fecha de registro:</strong> 
                            {formatDate(usuario.fechaRegistro)}
                        </div>
                        <div className="user-detail">
                            <strong>Estado:</strong> 
                            <span className={`status ${usuario.estado?.toLowerCase() || 'activo'}`}>
                                {usuario.estado || 'Activo'}
                            </span>
                        </div>
                    </div>
                    <div className="user-avatar-large">
                        <img 
                            src={usuario.img || Usuario} 
                            alt={`${usuario.nombre} ${usuario.apellido}`}
                            onError={(e) => {
                                e.target.src = Usuario;
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="orders-section">
                <div className="orders-header">
                    <h3 className="orders-title">
                        Últimas órdenes ({ordenes.length} total)
                    </h3>
                </div>
                
                {ordenes.length === 0 ? (
                    <div className="no-orders">
                        <p>Este usuario no tiene órdenes registradas.</p>
                    </div>
                ) : (
                    <>
                        <div className="orders-table">
                            <div className="table-header">
                                <div>#ID</div>
                                <div>Fecha</div>
                                <div>Total</div>
                                <div>Estado</div>
                                <div>Acciones</div>
                            </div>
                            
                            <div id="ordersContainer">
                                {getCurrentPageOrders().map((orden) => (
                                    <div key={orden.id} className="order-row">
                                        <div 
                                            className="order-id" 
                                            onClick={() => viewOrderDetails(orden.id)}
                                        >
                                            #{orden.id}
                                        </div>
                                        <div className="order-date">
                                            {formatDate(orden.fecha)}
                                        </div>
                                        <div className="order-total">
                                            {formatCurrency(orden.total)}
                                        </div>
                                        <div className="order-status">
                                            <span className={`status ${orden.estado?.toLowerCase().replace(/\s+/g, '-') || 'pendiente'}`}>
                                                {orden.estado || 'Pendiente'}
                                            </span>
                                        </div>
                                        <div>
                                            <button 
                                                className="view-details-btn" 
                                                onClick={() => viewOrderDetails(orden.id)}
                                            >
                                                Ver detalles
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

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
        </div>
    );
}

export default DetalleUs;