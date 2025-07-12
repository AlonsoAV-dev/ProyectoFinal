import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetalleOrd.scss";
import productoApi from "../../api/productoApi"; // Ajusta la ruta según tu estructura
import ordenApi from "../../api/ordenApi"; 


function DetalleOrd({ ordenId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Cargar datos de la orden y productos
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar orden específica
        const ordenData = await ordenApi.findOne(ordenId);
        setOrden(ordenData);

        // Obtener todos los productos de la API
        const productosData = await productoApi.findAll();
        
        // Agregar cantidad simulada a cada producto (esto debería venir de la tabla detalleOrden)
        const productosConCantidad = productosData.map(producto => ({
          ...producto,
          cantidad: Math.floor(Math.random() * 5) + 1 // Cantidad aleatoria entre 1 y 5
        }));

        setProducts(productosConCantidad);

        // Calcular total de páginas
        setTotalPages(Math.ceil(productosConCantidad.length / itemsPerPage));

      } catch (err) {
        setError(`Error al cargar los datos: ${err.message}`);
        console.error('Error loading order data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ordenId) {
      loadOrderData();
    }
  }, [ordenId]);

  // Cargar datos de la orden desde la API
  useEffect(() => {
    if (!loading && products.length > 0) {
      const rows = document.querySelectorAll('.product-row');
      rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
          row.style.transition = 'all 0.4s ease';
          row.style.opacity = '1';
          row.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  }, [loading, products, currentPage]);

  // Paginación
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
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

  // Función para manejar imagen del producto
  const getProductImage = (producto) => {
    if (producto.imagen) {
      // Si la imagen es una URL completa
      if (producto.imagen.startsWith('http')) {
        return producto.imagen;
      }
      // Si es una ruta de assets, construir la ruta correcta
      return `../../assets/${producto.imagen}`;
    }
    // Imagen por defecto
    return '../../assets/default-product.png';
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener clase CSS para el estado
  const getEstadoClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'entregado':
        return 'status-delivered';
      case 'por entregar':
        return 'status-pending';
      case 'en camino':
        return 'status-shipping';
      case 'cancelado':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  // Renderizado de paginación
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
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
      // Lógica para mostrar páginas con puntos suspensivos
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(
            <button
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => goToPage(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots1" className="dots">...</span>);
        pages.push(
          <button
            key={totalPages}
            className={currentPage === totalPages ? 'active' : ''}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          <button
            key={1}
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => goToPage(1)}
          >
            1
          </button>
        );
        pages.push(<span key="dots2" className="dots">...</span>);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(
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
        pages.push(
          <button
            key={1}
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => goToPage(1)}
          >
            1
          </button>
        );
        pages.push(<span key="dots3" className="dots">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => goToPage(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="dots4" className="dots">...</span>);
        pages.push(
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
    
    return pages;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando detalles de la orden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>Error al cargar la orden</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="container">
        <div className="error">
          <h2>Orden no encontrada</h2>
          <p>No se pudo encontrar la orden con ID: {ordenId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Detalles de Orden</h1>
      
      <div className="order-details-card">
        <div className="order-header">
          <div className="order-info">
            <h2 className="order-title">
              Orden <span className="order-id">#{orden.id}</span>
            </h2>
            <div className="order-meta">
              <div className="order-date">
                <span className="date-label">Fecha:</span>
                <span className="date-value">{formatearFecha(orden.fecha)}</span>
              </div>
              {orden.metodoDeEntrega && (
                <div className="delivery-method">
                  <span className="method-label">Método de entrega:</span>
                  <span className="method-value">{orden.metodoDeEntrega}</span>
                </div>
              )}
              {orden.tipoTarjeta && (
                <div className="payment-method">
                  <span className="payment-label">Método de pago:</span>
                  <span className="payment-value">{orden.tipoTarjeta}</span>
                </div>
              )}
            </div>
          </div>
          <div className="order-summary">
            <div className="order-status">
              <span className="status-label">Estado:</span>
              <span className={getEstadoClass(orden.estado)}>
                {orden.estado}
              </span>
            </div>
            <div className="order-totals">
              <div className="subtotal">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">S/{parseFloat(orden.subTotal).toFixed(2)}</span>
              </div>
              <div className="total-amount">
                <span className="total-label">Total:</span>
                <span className="total-value">S/{parseFloat(orden.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="products-section">
          <h3 className="products-title">Productos ordenados</h3>
          
          {products.length === 0 ? (
            <div className="no-products">
              <p>No hay productos en esta orden.</p>
            </div>
          ) : (
            <>
              <table className="products-table">
                <thead className="cabecera">
                  <tr>
                    <th>Producto</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageProducts().map((product, index) => (
                    <tr key={product.id} className="product-row">
                      <td>
                        <div className="product-info">
                          <img 
                            src={getProductImage(product)} 
                            alt={product.nombre} 
                            className="product-image"
                            onError={(e) => {
                              e.target.src = '../../assets/default-product.png';
                            }}
                          />
                          <div className="product-details">
                            <div className="product-id">#{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="product-name">{product.nombre}</td>
                      <td>
                        <span className="category-tag">{product.categoria}</span>
                      </td>
                      <td className="quantity">
                        <span className="quantity-value">{product.cantidad}</span>
                      </td>
                      <td className="unit-price">
                        S/{parseFloat(product.precio).toFixed(2)}
                      </td>
                      <td className="subtotal-price">
                        S/{(product.cantidad * product.precio).toFixed(2)}
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
                    className="pagination-btn"
                  >
                    ←
                  </button>
                  {renderPagination()}
                  <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleOrd;