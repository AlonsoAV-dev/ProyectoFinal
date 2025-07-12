import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetalleOrd.scss";
import ordenApi from "../../api/ordenApi.js";

function DetalleOrd() {
  const { idOrden } = useParams(); // Obtener ID de la URL
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos de la orden desde la API
  useEffect(() => {
    cargarDetallesOrden();
  }, [idOrden]);

  const cargarDetallesOrden = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener datos de la orden
      const ordenData = await ordenApi.obtenerOrden(idOrden);
      setOrden(ordenData);
      
    } catch (err) {
      console.error('Error al cargar orden:', err);
      setError('Error al cargar los detalles de la orden');
    } finally {
      setLoading(false);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Detalles de Orden</h1>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Cargando detalles de la orden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="page-title">Detalles de Orden</h1>
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '5px',
          margin: '20px 0'
        }}>
          <p>⚠️ {error}</p>
          <button 
            onClick={cargarDetallesOrden}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="container">
        <h1 className="page-title">Detalles de Orden</h1>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Orden no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Detalles de Orden</h1>
      
      <div className="order-details-card">
        <div className="order-header">
          <div>
            <h2 className="order-title">
              Orden <span className="order-id-main">#{orden.id}</span>
            </h2>
          </div>
          <div className="order-summary">
            <div className="order-status">
              <span className="status-label">Estado:</span>
              <span className={`status-value status-${orden.estado.toLowerCase()}`}>
                {orden.estado}
              </span>
            </div>
            <div className="total-amount">
              <span className="total-label">Monto total:</span>
              S/{orden.total}
            </div>
          </div>
        </div>

        <div className="order-info-section">
          <div className="order-details-grid">
            <div className="detail-item">
              <span className="detail-label">Fecha:</span>
              <span className="detail-value">
                {new Date(orden.fecha).toLocaleDateString('es-ES')}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Subtotal:</span>
              <span className="detail-value">S/{orden.subTotal}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Método de entrega:</span>
              <span className="detail-value">{orden.metodoDeEntrega}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tipo de tarjeta:</span>
              <span className="detail-value">{orden.tipoTarjeta}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Número de tarjeta:</span>
              <span className="detail-value">
                **** **** **** {orden.nroTarjeta ? orden.nroTarjeta.slice(-4) : 'No disponible'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ID de usuario:</span>
              <span className="detail-value">{orden.idUsuario}</span>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h3 className="products-title">Productos ordenados</h3>
          <div className="productos-placeholder">
            <p>Los productos de esta orden serán mostrados aquí.</p>
            <p><em>Esta funcionalidad será implementada por el compañero responsable del módulo de productos.</em></p>
          </div>
        </div>

        <div className="pagination">
          <button onClick={previousPage}>←</button>
          <button
            className={currentPage === 1 ? 'active' : ''} 
            onClick={() => goToPage(1)}
          >
            1
          </button>
          <button
            className={currentPage === 2 ? 'active' : ''} 
            onClick={() => goToPage(2)}
          >
            2
          </button>
          <button 
            className={currentPage === 3 ? 'active' : ''} 
            onClick={() => goToPage(3)}
          >
            3
          </button>
          <span className="dots">...</span>
          <button 
            className={currentPage === 10 ? 'active' : ''} 
            onClick={() => goToPage(10)}
          >
            10
          </button>
          <button onClick={nextPage}>→</button>
        </div>
      </div>
    </div>
  );
}

export default DetalleOrd;