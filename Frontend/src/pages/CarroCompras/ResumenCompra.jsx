import { Link } from "react-router-dom";
import "./ResumenCompra.scss"

const ResumenCompra=({modo }) =>{


    const resumenGuardado = JSON.parse(localStorage.getItem("resumen")) || {
        subtotal: 0,
        descuento: 0,
        total: 0,
        cantidadTotal: 0
    };

    return(
   <>
        <div className="resumen-compra">
            {modo=="orden completada"?<h1 className="titulo-resumen" style={{ marginBottom: "30px" }}/> :<h1 className="titulo-resumen">Resumen de la compra</h1> }
            <div className="contenedor-compra">
                <div className="precios-contenedor">
                    <div className="precio">
                        <p className="left">Productos ({resumenGuardado.cantidadTotal}) </p>
                        <p>S/ {resumenGuardado.subtotal?.toFixed(2)}</p>

                    </div>
                    <div className="precio">
                        <p className="left">Delivery </p>
                        <span className="oferta"> GRATIS </span>
                    </div>
                    <div className="precio">
                        <p className="left">Descuentos </p>
                        <span className="cantidad-descuento"> -S/{resumenGuardado.descuento?.toFixed(2)}</span>
                    </div>
                    <div className="total">
                        <p className="left"><b>Total</b> </p>
                        <p>S/{resumenGuardado.total?.toFixed(2)}</p>
                    </div>
                        {modo === "realizar pago" || modo === "orden completada"? null : (
                        <Link to={modo === "Continuar compra" ? "/checkout" : "/metodoPago"}>
                            <button className="continuar-compra">
                            {modo === "Continuar compra" ? "Continuar compra" : "Seleccionar método de pago"}
                            </button>
                        </Link>
                        )}
                </div>
            </div>
        </div>
    </>
    )
}
export default ResumenCompra;