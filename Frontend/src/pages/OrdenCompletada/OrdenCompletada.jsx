import ResumenCompra from "../CarroCompras/ResumenCompra";
import ProductoCarrito from "../ProductosCarrito/ProductosCarrito";
import "./OrdenCompletada.scss";
import check from "/assets/check.png"
import delivery from  "/assets/delivery-logo.png"
import { Link } from "react-router-dom";
import ItemOrdenApi from "../../api/itemOrdenApi.js";

const OrdenCompletada = () => {
  const usuarioId = 1; // o el que estés usando
  const resumen = JSON.parse(localStorage.getItem("resumen")) || {
      subtotal: 0,
      descuento: 0,
      total: 0,
      cantidadTotal: 0,
      productos: []
    };
  const limpiarCompra = async () => {
    localStorage.removeItem("resumen");
    localStorage.removeItem("datosEnvio");

    try {
      const carrito = await carritoApi.findByUsuario(usuarioId);
      if (!carrito) return;

      const items = await itemCarritoApi.findByCarrito(carrito.id);

      for (const item of items) {
        await itemCarritoApi.remove(item.id);
      }
    } catch (error) {
      console.error("❌ Error limpiando el carrito:", error);
    }
  };
  const datosEnvio = JSON.parse(localStorage.getItem("datosEnvio")) || {};
  const direccion = {
      direccion: datosEnvio.direccion || "No definida",
      ciudad: `${datosEnvio.ciudad || ""} - ${datosEnvio.departamento || ""}`,
      celular: datosEnvio.telefono || "No definido",
      entrega: new Date().toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
      })
  };


  return (
    <div className="orden-completada">
      <div className="seccion-orden-terminada">
        <div className="contenedor-titulo">
          <h1>Orden completada 😁 </h1>
          <p>Gracias por tu compra!</p>
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
              <Link to={"/ "} >
              <button onClick={limpiarCompra}>Ver más ofertas</button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrdenCompletada;