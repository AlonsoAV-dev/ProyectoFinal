import { useEffect, useState, useRef } from "react";
import "./DetalleP.scss";
import palta from "../../assets/palta.png";
import uvas from "../../assets/uvas.png";
import pera from "../../assets/pera.png";
import manzana from "../../assets/manzanas.png";
import pitahaya from "../../assets/pithaya.png";
import sandia from "../../assets/sandia.png";

function DetalleP() {
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [cardWidth] = useState(200); 
  const [visibleCards, setVisibleCards] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const newVisibleCards = Math.floor(window.innerWidth / cardWidth);
      setVisibleCards(newVisibleCards);
      
      const cards = document.querySelectorAll('.product-card');
      setMaxPosition(Math.max(0, cards.length - newVisibleCards));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [maxPosition, isScrolling, cardWidth]);

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

  return (
    <>
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <a href="#" onClick={(e) => handleBreadcrumbClick(e, "Supermercado")}>Supermercado</a> › 
          <a href="#" onClick={(e) => handleBreadcrumbClick(e, "Frutas")}>Frutas</a>
        </div>
      </div>

      <main className="main-content">
        <div className="product-container">
          <div className="product-detail">
            <div className="product-image">
              <img src={palta} alt="Palta" id="palta-imagen"/>
            </div>
            <div className="product-info">
              <h1>Palta</h1>
              <div className="product-weight">Presentación 0.6 kg</div>
              <div className="product-description">
                El aguacate es el fruto del árbol del mismo nombre de hoja perenne de la familia de las Lauráceas. Con forma de pera en general, la cáscara es de color verde a negro según cada
              </div>
              <div className="product-price">
                <span className="price-current">S/ 8.90</span>
                <span className="price-unit">x kg</span>
              </div>
              <button className="btn-add-cart" onClick={addToCart}>
                🛒 AGREGAR
              </button>
            </div>
          </div>
        </div>

        <div className="similar-products">
          <h2>Productos similares</h2>
          <div className="products-carousel">
            <div className="products-grid" id="products-grid">
              <div className="product-card">
                <img src={uvas} alt="Uvas"/>
                <h4>Uvas</h4>
                <div className="subtitle">Frescas y dulces</div>
                <div className="price">S/ 5.50 x kg</div>
                <button className="btn-add" onClick={addSimilarProduct}>AGREGAR</button>
              </div>
              <div className="product-card">
                <img src={pera} alt="Pera"/>
                <h4>Pera</h4>
                <div className="subtitle">Jugosas y crujientes</div>
                <div className="price">S/ 4.90 x kg</div>
                <button className="btn-add" onClick={addSimilarProduct}>AGREGAR</button>
              </div>
              <div className="product-card">
                <img src={manzana} alt="Manzana roja"/>
                <h4>Manzana roja</h4>
                <div className="subtitle">Dulces y crujientes</div>
                <div className="price">S/ 6.70 x kg</div>
                <button className="btn-add" onClick={addSimilarProduct}>AGREGAR</button>
              </div>
              <div className="product-card">
                <img src={pitahaya} alt="Pitaya"/>
                <h4>Pitaya</h4>
                <div className="subtitle">Exótica y refrescante</div>
                <div className="price">S/ 15.80 x kg</div>
                <button className="btn-add" onClick={addSimilarProduct}>AGREGAR</button>
              </div>
              <div className="product-card">
                <img src={sandia} alt="Sandía"/>
                <h4>Sandía</h4>
                <div className="subtitle">Jugosa y refrescante</div>
                <div className="price">S/ 3.50 x kg</div>
                <button className="btn-add" onClick={addSimilarProduct}>AGREGAR</button>
              </div>
            </div>
            <button className="carousel-nav carousel-prev" onClick={() => moveCarousel(-1)}>‹</button>
            <button className="carousel-nav carousel-next" onClick={() => moveCarousel(1)}>›</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetalleP;