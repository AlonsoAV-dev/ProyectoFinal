import { useState } from "react";
import "./Categorias.scss";
import zanahoria from "../../assets/zanahoria.png";
import papaya from "../../assets/papaya.png";
import mixfrutas from "../../assets/mixfrutas.png";
import manzana from "../../assets/manzanas.png";
import naranja from "../../assets/naranja.png";
import piña from "../../assets/piña.png";
import sandia from "../../assets/sandia.png";
import uvas from "../../assets/uvas.png";
import pera from "../../assets/pera.png";
import pitahaya from "../../assets/pithaya.png";

function Categorias() {
  const [activeCategory, setActiveCategory] = useState("Frutas y verduras");
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const products = [
    { id: 1, name: "Zanahoria", category: "Frutas y verduras", price: "S/2.99 x kg", image: zanahoria },
    { id: 2, name: "Papaya", category: "Frutas y verduras", price: "S/2.99 x kg", image: papaya },
    { id: 3, name: "Mix de frutas", category: "Frutas y verduras", price: "S/5.99 x un", image: mixfrutas },
    { id: 4, name: "Manzana", category: "Frutas y verduras", price: "S/3.80 x kg", image: manzana },
    { id: 5, name: "Naranja", category: "Frutas y verduras", price: "S/2.99 x kg", image: naranja },
    { id: 6, name: "Piña", category: "Frutas y verduras", price: "S/2.99 x kg", image: piña },
    { id: 7, name: "Sandía", category: "Frutas y verduras", price: "S/2.99 x kg", image: sandia },
    { id: 8, name: "Uvas", category: "Frutas y verduras", price: "S/2.99 x kg", image: uvas },
    { id: 9, name: "Pera", category: "Frutas y verduras", price: "S/2.99 x kg", image: pera },
    { id: 10, name: "Manzana roja", category: "Frutas y verduras", price: "S/2.99 x kg", image: manzana },
    { id: 11, name: "Pitahaya", category: "Frutas y verduras", price: "S/2.99 x kg", image: pitahaya },
    { id: 11, name: "Pitahaya", category: "Frutas y verduras", price: "S/2.99 x kg", image: pitahaya }
  ];

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
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="product-card"
                style={getCardStyle(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name}/>
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-category">{product.category}</div>
                <div className="product-price">{product.price}</div>
                <button className="add-btn" onClick={handleAddToCart}>Agregar</button>
              </div>
            ))}
          </div>

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