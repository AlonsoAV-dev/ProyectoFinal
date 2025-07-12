import { useEffect, useState } from "react";
import "./Categorias.scss";
import productosApi from "../../api/productoApi.js";

function Categorias() {
  const [activeCategory, setActiveCategory] = useState("Frutas y verduras");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
    
  const handleLoad = async () => {
    try {
      setLoading(true);
      const datosProductos = await productosApi.findAll();
      setProductos(datosProductos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleAddToCart = (e) => {
    const button = e.currentTarget;
    button.style.background = '#27ae60';
    button.textContent = '✓ Agregado';
    
    setTimeout(() => {
      button.style.background = '';
      button.textContent = 'Agregar';
    }, 1000);
  };

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setActiveCategory(category);
    console.log('Categoría seleccionada:', category);
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyle = (index) => {
    return {
      transform: hoveredCard === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
      transition: 'transform 0.3s ease'
    };
  };



  const filteredProducts = productos.filter(product => 
    product.categoria === activeCategory || 
    (product.category && product.category === activeCategory)
  );

  const categories = [
    "Frutas y verduras",
    "Carnes, aves y pescados",
    "Desayunos",
    "Lácteos y huevos",
    "Queso y fiambres",
    "Abarrotes",
    "Panadería",
    "Congelados"
  ];

  if (loading) {
    return (
      <div className="main-container">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container">
        <aside className="sidebar">
          <h3>Categorías</h3>
          {categories.map((category) => (
            <a 
              key={category}
              href="#" 
              className={`categoria-item ${activeCategory === category ? 'active' : ''}`}
              onClick={(e) => handleCategoryClick(e, category)}
            >
              {category}
            </a>
          ))}
        </aside>

        <main className="products-section">
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="product-card"
                style={getCardStyle(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="product-image">
                  <img 
                    src={product.imagen} 
                    alt={product.nombre}
                  />
                </div>
                <div className="product-name">{product.nombre}</div>
                <div className="product-category">{product.categoria}</div>
                <div className="product-price">
                  {product.precio ? `S/${product.precio}` : product.price}
                </div>
                <button className="add-btn" onClick={handleAddToCart}>Agregar</button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              No hay productos disponibles en esta categoría
            </div>
          )}

          <div className="pagination">
            <a className="nav-arrow">‹</a>
            <a className="active">1</a>
            <a>2</a>
            <a>3</a>
            <span>...</span>
            <a>10</a>
            <a className="nav-arrow">›</a>
          </div>
        </main>
      </div>
    </>
  );
}

export default Categorias;