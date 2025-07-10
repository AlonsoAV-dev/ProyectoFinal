import { useState, useEffect } from "react";
import "./DetalleOrd.scss";
import manzana from "../../assets/manzanas.png";
import leche from "../../assets/leche.png";
import papaya from "../../assets/papaya.png";
import sandia from "../../assets/sandia.png";
import pollo from "../../assets/pollocr.png";
import uvas from "../../assets/uvas.png";

function DetalleOrd() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products] = useState([
    { 
      id: "#0223", 
      name: "Manzanas Rojas", 
      category: "Frutas y verduras", 
      quantity: 10, 
      price: "S/19.00", 
      image: manzana 
    },
    { 
      id: "#6425", 
      name: "Leche gloria", 
      category: "Lacteos y huevos", 
      quantity: 4, 
      price: "S/19.00", 
      image: leche 
    },
    { 
      id: "#2344", 
      name: "Papaya", 
      category: "Frutas y verduras", 
      quantity: 4, 
      price: "S/10.00", 
      image: papaya 
    },
    { 
      id: "#4344", 
      name: "Sandía", 
      category: "Frutas y verduras", 
      quantity: 12, 
      price: "S/19.00", 
      image: sandia 
    },
    { 
      id: "#5454", 
      name: "Pollo entero fresco con menudencia", 
      category: "Carnes, aves y pescados", 
      quantity: 1, 
      price: "S/10.00", 
      image: pollo 
    },
    { 
      id: "#8123", 
      name: "Uvas", 
      category: "Frutas y verduras", 
      quantity: 1, 
      price: "S/10.00", 
      image: uvas 
    }
  ]);

  // Animación de entrada suave
  useEffect(() => {
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
  }, []);

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

  return (
    <div className="container">
      <h1 className="page-title">Detalles de Orden</h1>
      
      <div className="order-details-card">
        <div className="order-header">
          <div>
            <h2 className="order-title">Orden <span className="order-id">#1234</span></h2>
          </div>
          <div className="order-summary">
            <div className="order-status">
              <span className="status-label">Estado:</span>
              <span className="status-delivered">Entregado</span>
            </div>
            <div className="total-amount">
              <span className="total-label">Monto total:</span>
              S/400.00
            </div>
          </div>
        </div>

        <div className="products-section">
          <h3 className="products-title">Productos ordenados</h3>
          
          <table className="products-table">
            <thead className="cabecera">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="product-row">
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} className="product-image"/>
                      <div className="product-details">
                        <div className="product-id">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="product-name">{product.name}</td>
                  <td><span className="category-tag">{product.category}</span></td>
                  <td className="quantity">{product.quantity}</td>
                  <td className="price">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
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