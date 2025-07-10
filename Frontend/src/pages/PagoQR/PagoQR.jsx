import "./PagoQR.scss"
import qr from "/assets/pagarQR.png"
import { Link } from "react-router-dom";
const PagoQR = () => {
  return (
    <div className="PagoQR">
      <h2>Escanear QR</h2>
      <div className="ticker-qr">
        <img src={qr} alt="QR de pago" />
        <p>Válido por 05:00 minutos</p>
      </div>
      <div className="pagar-contenedor">
      <Link to="/OrdenCompletada">
      <button>Ya realicé el pago</button>
      </Link>
      </div>
    </div>
  );
};

export default PagoQR;