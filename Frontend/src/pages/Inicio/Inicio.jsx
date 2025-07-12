import { useState, useEffect } from "react";
import "./Inicio.scss";
import banner from "../../assets/banner.png";
import platano from "../../assets/platano.png";
import carnes from "../../assets/carnes.png";
import arroz from "../../assets/abarrotes.png";
import cloro from "../../assets/limpieza.png";
import listaProductos from "../../api/productoApi.js";
import funcionAgregarCarro from "../../components/AddToCart/AddToCart.jsx";
import categoriasApi from "../../api/categoriaApi.js";
import { Link } from "react-router-dom";


function Inicio() {
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

const imagenesCategorias = {
  "Frutas y verduras": platano,
  "Carnes, aves y pescados": carnes,
  "Abarrotes": arroz,
  "Limpieza": cloro,
  "Lacteos y huevos": arroz,
};
  const handleProductos = async () => {
    const datos = await listaProductos.findAll();
    const categoriasDatos = await categoriasApi.findAll();
    setCategorias(categoriasDatos);
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



    return (
    <>
      <div className="banner">
        <img src={banner} alt="Banner promocional" id="bannerimg"/>
      </div>

      <main className="main-content">
        <section>
          <h2 className="section-title">Explora las categorías</h2>
          <div className="categories-grid">
  {categorias.map((categoria) => (
    <Link
      to={`/categorias`} // o `/categoria/${categoria.id}`
      key={categoria.id}
      className="category-item"
    >
      <div className="category-icon">
        <img
          src={imagenesCategorias[categoria.nombre] || cloro}
          alt={categoria.nombre}
          width="80px"
        />
      </div>
      <div className="category-name">{categoria.nombre}</div>
    </Link>
  ))}
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