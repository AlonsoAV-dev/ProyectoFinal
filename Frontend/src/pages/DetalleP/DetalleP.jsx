import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./DetalleP.scss";
import productosApi from "../../api/productoApi.js";

function DetalleP() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [productosSimilares, setProductosSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [cardWidth] = useState(200); 
  const [visibleCards, setVisibleCards] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        const todosProductos = await productosApi.findAll();
        
        const productoActual = todosProductos.find(p => p.id === parseInt(id));
        setProducto(productoActual);
        
        if (productoActual) {
          const similares = todosProductos
            .filter(p => 
              p.id !== productoActual.id && 
              (p.categoria === productoActual.categoria || p.category === productoActual.category)
            )
            .slice(0, 8); 
          setProductosSimilares(similares);
        }
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarDatos();
    }
  }, [id]);

  useEffect(() => {
    const updateDimensions = () => {
      const newVisibleCards = Math.floor(window.innerWidth / cardWidth);
      setVisibleCards(newVisibleCards);
      setMaxPosition(Math.max(0, productosSimilares.length - newVisibleCards));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [productosSimilares.length, cardWidth]);

  useEffect(() => {
    const grid = document.getElementById('products-grid');
    if (grid) {
      grid.style.transform = `translateX(-${carouselPosition * cardWidth}px)`;
    }
  }, [carouselPosition, cardWidth]);

  function moveCarousel(direction) {
    setCarouselPosition(prev => {
      const newPosition = prev + direction;
      if (newPosition < 0) return 0;
      if (newPosition > maxPosition) return maxPosition;
      return newPosition;
    });
  }

  function addToCart() {
    const button = document.querySelector('.btn-add-cart');
    if (button) {
      button.textContent = '✓ AGREGADO';
      button.style.backgroundColor = '#4caf50';
      
      setTimeout(() => {
        button.textContent = '🛒 AGREGAR';
        button.style.backgroundColor = '#ff6b6b';
      }, 2000);
    }
  }

  function addSimilarProduct(e) {
    const button = e.currentTarget;
    button.textContent = 'AGREGADO ✓';
    button.style.backgroundColor = '#4caf50';
    button.style.color = 'white';
    button.style.borderColor = '#4caf50';
    
    setTimeout(() => {
      button.textContent = 'AGREGAR';
      button.style.backgroundColor = 'transparent';
      button.style.color = '#ff6b6b';
      button.style.borderColor = '#ff6b6b';
    }, 2000);
  }

  function handleBreadcrumbClick(e, text) {
    e.preventDefault();
    alert(`Navegando a: ${text}`);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="error-container">
        <div className="error">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <a href="#" onClick={(e) => handleBreadcrumbClick(e, "Supermercado")}>Supermercado</a> › 
          <a href="#" onClick={(e) => handleBreadcrumbClick(e, producto.categoria || producto.category)}>
            {producto.categoria || producto.category}
          </a>
        </div>
      </div>

      <main className="main-content">
        <div className="product-container">
          <div className="product-detail">
            <div className="product-image">
              <img 
                src={producto.imagen } 
                alt={producto.nombre}
                id="producto-imagen"
              />
            </div>
            <div className="product-info">
              <h1>{producto.nombre}</h1>
              <div className="product-weight">
                {producto.presentacion}
              </div>
              <div className="product-description">
                {producto.descripcion }
              </div>
              <div className="product-price">
                <span className="price-current">
                  S/ {producto.precio}
                </span>
                <span className="price-unit">
                  {producto.unidad || 'x kg'}
                </span>
              </div>
              <button className="btn-add-cart" onClick={addToCart}>
                🛒 AGREGAR
              </button>
            </div>
          </div>
        </div>

        <div className="similar-products">
          <h2>Productos similares</h2>
          {productosSimilares.length > 0 ? (
            <div className="products-carousel">
              <div className="products-grid" id="products-grid">
                {productosSimilares.map((producto) => (
                  <div key={producto.id} className="product-card">
                    <img 
                      src={producto.imagen } 
                      alt={producto.nombre }
                    />
                    <h4>{producto.nombre}</h4>
                    <div className="subtitle">
                      {'Fresco y de calidad'}
                    </div>
                    <div className="price">
                      S/ {producto.precio}
                    </div>
                    <button className="btn-add" onClick={addSimilarProduct}>
                      AGREGAR
                    </button>
                  </div>
                ))}
              </div>
              <button className="carousel-nav carousel-prev" onClick={() => moveCarousel(-1)}>‹</button>
              <button className="carousel-nav carousel-next" onClick={() => moveCarousel(1)}>›</button>
            </div>
          ) : (
            <div className="no-similar-products">
              No hay productos similares disponibles
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default DetalleP;