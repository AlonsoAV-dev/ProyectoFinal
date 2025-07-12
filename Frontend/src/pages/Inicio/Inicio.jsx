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
import listaProductos from "../../api/productoApi.js";
import funcionAgregarCarro from "../../components/AddToCart/AddToCart.jsx";
function Inicio() {
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const handleProductos = async () => {
    const datos = await listaProductos.findAll();
    setProductos(datos);
  };
  useEffect(() => {
    handleProductos();
  }, []);

    const handleAddToCart = async (e, producto) => {
        e.preventDefault();
        const button = e.currentTarget;
        const exito = await funcionAgregarCarro(producto);
        if (exito) {
            button.textContent = 'AGREGADO ✓';
            button.style.backgroundColor = '#4caf50';
            setTimeout(() => {
              button.textContent = 'AGREGAR';
              button.style.backgroundColor = '#ff6b6b';
            }, 2000);
          }
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
            {productos.slice(0,5).map((producto) => (
              <a href="#" className="productos-card" key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="product-title">{producto.nombre}</div>
                <div className="product-price">S/{producto.precio} X KG</div>
                <button className="btn-agregar" onClick={(e) => handleAddToCart(e, producto)}>
                  AGREGAR
                </button>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Inicio;