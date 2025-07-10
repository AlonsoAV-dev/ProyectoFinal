import "./PagoTarjeta.scss"
import tarjeta from "/assets/tarjeta.png"
import { Link } from "react-router-dom";
const PagoTarjeta = () => {
  return (
    <div className="pago-tarjeta">
    <img src={tarjeta} alt="Tarjeta" />        
      <Link to="/OrdenCompletada">

      <button type="submit">Pagar</button>
      </Link>
    </div>
  );
};

export default PagoTarjeta;