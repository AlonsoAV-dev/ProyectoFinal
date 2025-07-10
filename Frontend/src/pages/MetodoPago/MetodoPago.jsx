import "./MetodoPago.scss"
import ResumenCompra from "../CarroCompras/ResumenCompra";
import { Outlet } from "react-router-dom";

const MetodoPago = () => {

  return (
    <div className="checkout-container">
      <div className="metodo-pago">
        <h2>Checkout</h2>
        <p><b>Metodo pago</b></p>
        <Outlet/>      
      </div>

      <div className="resumen-compra">
        <ResumenCompra modo="realizar pago" />
      </div>
    </div>
  );
};

export default MetodoPago;
