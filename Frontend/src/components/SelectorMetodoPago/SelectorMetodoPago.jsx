import qr from "../../../public/assets/qr.png";
import paypal from "../../../public/assets/paypal.png";
import "./SelectorMetodoPago.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectorMetodoPago = () => {
  const [metodo, setMetodo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (metodo === "qr") {
      navigate("/metodoPago/qr");
    } else if (metodo === "tarjeta") {
      navigate("/metodoPago/tarjeta");
    } else {
      alert("Selecciona un método de pago");
    }
  };

  return (
    <div className="metodo-pago-box">
      <label className="opcion-pago">
        <input
          type="radio"
          name="metodoPago"
          value="qr"
          checked={metodo === "qr"}
          onChange={() => setMetodo("qr")}
        />
        <span><strong>Generar QR</strong></span>
        <img src={qr} alt="QR" id="scan" />
      </label>

      <label className="opcion-pago" id="opcion-2">
        <input
          type="radio"
          name="metodoPago"
          value="tarjeta"
          checked={metodo === "tarjeta"}
          onChange={() => setMetodo("tarjeta")}
        />
        <img src={paypal} alt="Tarjeta" id="pay" />
      </label>
      <div className="boton-enviar-tipo-pago">
        <button onClick={handleSubmit} className="boton-enviar">
        Continuar
      </button>
      </div>
      
    </div>
  );
};

export default SelectorMetodoPago;
