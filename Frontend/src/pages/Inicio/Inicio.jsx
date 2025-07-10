import { useState, useEffect } from "react";
import "./Inicio.scss";
import banner from "../../assets/banner.png";
import platano from "../../assets/platano.png";
import pollocr from "../../assets/pollo.png";
import zanahorias from "../../assets/zanahoria.png";
import azucar from "../../assets/azucar.png";
import avena from "../../assets/avena.png";
import cafe from "../../assets/cafe.png";
import carnes from "../../assets/carnes.png";
import arroz from "../../assets/abarrotes.png";
import cloro from "../../assets/limpieza.png";

function Inicio() {
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

    const handleAddToCart = (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        button.textContent = 'AGREGADO ✓';
        button.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
        button.textContent = 'AGREGAR';
        button.style.backgroundColor = '#ff6b6b';
        }, 2000);
    };

    const handleCategoryClick = (e, categoryName) => {
    e.preventDefault();
    alert(`Navegando a categoría: ${categoryName}`);
    };

    return (
    <>
      <div className="banner">
        <img src={banner} alt="Banner promocional" id="bannerimg"/>
      </div>

      <main className="main-content">
        <section>
          <h2 className="section-title">Explora las categorías</h2>
          <div className="categories-grid">
            <a href="#" className="category-item" onClick={(e) => handleCategoryClick(e, "Frutas y verduras")}>
              <div className="category-icon"><img src={platano} alt="platanos" width="80px"/></div>
              <div className="category-name">Frutas y verduras</div>
            </a>
            <a href="#" className="category-item" onClick={(e) => handleCategoryClick(e, "Carnes, aves y pescado")}>
              <div className="category-icon"><img src={carnes} alt="Carnes" width="80px"/></div>
              <div className="category-name">Carnes, aves y pescado</div>
            </a>
            <a href="#" className="category-item" onClick={(e) => handleCategoryClick(e, "Abarrotes")}>
              <div className="category-icon"><img src={arroz} alt="Abarrotes" width="80px"/></div>
              <div className="category-name">Abarrotes</div>
            </a>
            <a href="#" className="category-item" onClick={(e) => handleCategoryClick(e, "Limpieza")}>
              <div className="category-icon"><img src={cloro} alt="Limpieza" width="80px"/></div>
              <div className="category-name">Limpieza</div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="section-title">Lo más vendido</h2>
          <div className="products-grid">
            <a href="#" className="productos-card">
              <img src={pollocr} alt="Pollo Fresco"/>
              <div className="product-title">Pollo Entero Fresco con presentación</div>
              <div className="product-price">S/9.40 X KG</div>
              <button className="btn-agregar" onClick={handleAddToCart}>AGREGAR</button>
            </a>
            <a href="#" className="productos-card">
              <img src={zanahorias} alt="Zanahorias"/>
              <div className="product-title">Zanahorias Orgánicas especiales</div>
              <div className="product-price">S/9.40 X KG</div>
              <button className="btn-agregar" onClick={handleAddToCart}>AGREGAR</button>
            </a>
            <a href="#" className="productos-card">
              <img src={azucar} alt="Azucar"/>
              <div className="product-title">Azucar moreno BELL'S</div>
              <div className="product-price">S/9.40 X KG</div>
              <button className="btn-agregar" onClick={handleAddToCart}>AGREGAR</button>
            </a>
            <a href="#" className="productos-card">
              <img src={avena} alt="Avena"/>
              <div className="product-title">Avena QUAKER tradicional</div>
              <div className="product-price">S/9.40 X KG</div>
              <button className="btn-agregar" onClick={handleAddToCart}>AGREGAR</button>
            </a>
            <a href="#" className="productos-card">
              <img src={cafe} alt="Café"/>
              <div className="product-title">Café Instantáneo ALTOMAYO</div>
              <div className="product-price">S/9.40 X KG</div>
              <button className="btn-agregar" onClick={handleAddToCart}>AGREGAR</button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default Inicio;