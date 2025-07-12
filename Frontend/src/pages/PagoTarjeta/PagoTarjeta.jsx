import "./PagoTarjeta.scss";
import tarjeta from "/assets/tarjeta.png";
import { useNavigate } from "react-router-dom";
import apiOrden from "../../api/ordenApi.js";
import itemOrdenApi from "../../api/itemOrdenApi.js";

const PagoTarjeta = () => {
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
        nroTarjeta: "1234-****-****-5678", // ⚠️ Simulado
        tipoTarjeta: "Visa",               // ⚠️ Simulado
        estado: "Pagada"
      };

      const ordenCreada = await apiOrden.crearOrden(nuevaOrden);
      console.log("✅ Orden creada:", ordenCreada);
      localStorage.setItem("ordenId", ordenCreada.id); // ✅ guarda ID

      for (const producto of resumen.productos) {
        const item = {
          idOrden: ordenCreada.id,
          idProducto: producto.id,
          cantidad: producto.cantidad,
          precioUnitario: producto.precio
        };
        await itemOrdenApi.create(item);
      }

      navigate("/OrdenCompletada");
    } catch (error) {
      console.error("❌ Error al crear la orden:", error);
      alert("Ocurrió un error al procesar tu pago.");
    }
  };

  return (
    <div className="pago-tarjeta">
      <img src={tarjeta} alt="Tarjeta" />
      <button onClick={handleConfirmarPago}>Pagar</button>
    </div>
  );
};

export default PagoTarjeta;
