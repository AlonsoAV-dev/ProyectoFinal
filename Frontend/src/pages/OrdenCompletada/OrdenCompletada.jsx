import ResumenCompra from "../CarroCompras/ResumenCompra";
import ProductoCarrito from "../ProductosCarrito/ProductosCarrito";
import "./OrdenCompletada.scss";
import check from "/assets/check.png"
import delivery from  "/assets/delivery-logo.png"
import { Link } from "react-router-dom";
const OrdenCompletada = () => {
  const resumen = JSON.parse(localStorage.getItem("resumen")) || {
    subtotal: 0,
    descuento: 0,
    total: 0,
    cantidadTotal: 0,
    productos: []
  };
  
  // Obtener ID de orden si está disponible
  const ordenId = localStorage.getItem("ultimaOrdenId") || null;
  // Podrías guardar esta info al confirmar pago
  const direccion = {
    direccion: "Av la molina 12334",
    ciudad: "Lima - Lima",
    celular: "990892131",
    entrega: "04/05/2025"
  };

  return (
    <div className="orden-completada">
      <div className="seccion-orden-terminada">
        <div className="contenedor-titulo">
          <h1>Orden completada 😁 </h1>
          <p>Gracias por tu compra!</p>
          {ordenId && (
            <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
              Número de orden: <strong>#{ordenId}</strong>
            </p>
          )}
        </div>
        <img src={check} alt="" />
      </div>
      <div className="resumen-seccion">
        <div className="contenedor-izquierda">
          <div className="titulo-resumen-compra">
            <h2>Resumen de la compra</h2>
            </div>
            
            <div className="productos-carrito">
              {resumen.productos.map((producto) => (
                <ProductoCarrito
                  key={producto.id}
                  producto={producto}
                  cantidad={producto.cantidad}
                  cambiarCantidad={null} 
                  soloLectura={true}

                />
              ))}
          </div>

        </div>

        <div className="contenedor-derecha">
          <ResumenCompra modo="orden completada" />
          <div className="direccion-envio">
            <div className="titulo-enviar">
              <div className="contenedor-direccion">
              <h3>Dirección de envío</h3>
              <p>{direccion.direccion}</p>
              </div>
              <img src={delivery} alt="" />
            </div>
            <p>{direccion.ciudad}</p>
            <p>Celular de contacto: {direccion.celular}</p>
            <p>Fecha de entrega aproximada:<b> {direccion.entrega}</b></p>
          </div>
          <div className="boton-ofertas">
            {ordenId && (
              <Link to={`/orden/${ordenId}`} style={{ marginRight: '10px' }}>
                <button style={{ backgroundColor: '#007bff', marginRight: '10px' }}>
                  Ver detalles de la orden
                </button>
              </Link>
            )}
            <Link to={"/ "} >
              <button onClick={() => {
                localStorage.removeItem("resumen");
                localStorage.removeItem("ultimaOrdenId");
              }}>
                Ver más ofertas
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenCompletada;