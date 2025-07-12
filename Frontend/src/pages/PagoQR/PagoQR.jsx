import "./PagoQR.scss";
import qr from "/assets/pagarQR.png";
import { useNavigate } from "react-router-dom";
import apiOrden from "../../api/ordenApi.js";
import itemOrdenApi from "../../api/itemOrdenApi.js"
const PagoQR = () => {
  const navigate = useNavigate();

  const handleConfirmarPago = async () => {
    try {
      const datosEnvio = JSON.parse(localStorage.getItem("datosEnvio"));
      const resumen = JSON.parse(localStorage.getItem("resumen"));

      if (!datosEnvio || !resumen) {
        alert("Faltan datos del resumen o de envío.");
        return;
      }

      const nuevaOrden = {
        idUsuario: datosEnvio.idUsuario,
        fecha: new Date().toISOString().split("T")[0],
        subTotal: resumen.subtotal.toFixed(2),
        total: resumen.total.toFixed(2),
        metodoDeEntrega: "Delivery",
        nroTarjeta: null,
        tipoTarjeta: null,
        estado: "Pagada",
      };

      const ordenCreada = await apiOrden.crearOrden(nuevaOrden);
      console.log("✅ Orden creada:", ordenCreada); // ✅
      for (const producto of resumen.productos) {
          const item = {
            idOrden: ordenCreada.id,
            idProducto: producto.id,
            cantidad: producto.cantidad,
            precioUnitario: producto.precio // o producto.precioUnitario si así lo tienes
        };
        localStorage.setItem("ordenId", ordenCreada.id); // ✅ guarda ID de orden

        await itemOrdenApi.create(item);
      }

      navigate("/OrdenCompletada");
    } catch (error) {
      console.error("❌ Error al crear la orden:", error);
      alert("Ocurrió un error al procesar tu pago.");
    }
  };

  return (
      <div className="PagoQR">
        <h2>Escanear QR</h2>
        <div className="ticker-qr">
            <img src={qr} alt="QR de pago" />
            <p>Válido por 05:00 minutos</p>
        </div>
          <div className="pagar-contenedor">
            <button onClick={handleConfirmarPago}>Ya realicé el pago</button>
          </div>
        </div>
    );
};

export default PagoQR;
