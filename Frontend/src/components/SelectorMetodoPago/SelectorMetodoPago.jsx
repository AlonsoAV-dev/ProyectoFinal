import qr from "../../../public/assets/qr.png"
import paypal from "../../../public/assets/paypal.png"
import "./SelectorMetodoPago.scss"
import { Link } from "react-router-dom";


const SelectorMetodoPago = () => {
  return (
    <div className="metodo-pago-box">
      <Link to="/metodoPago/qr">
        <label className="opcion-pago">
          <input type="radio" name="metodoPago" />
          <span><strong>Generar QR</strong></span>
          <img src={qr} alt="QR" id="scan" />
        </label>
      </Link>

      <Link to="/metodoPago/tarjeta">
        <label className="opcion-pago" id="opcion-2">
          <input type="radio" name="metodoPago" />
          <img src={paypal} alt="Tarjeta" id="pay" />
        </label>
      </Link>
    </div>
  );
};
export default SelectorMetodoPago;