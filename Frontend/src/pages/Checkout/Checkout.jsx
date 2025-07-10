import ResumenCompra from "../CarroCompras/ResumenCompra"
import "./Checkout.scss"
const Checkout = () => {

    return(
        <>
        <div className="checkout">
            <div class="contenedor-formulario">
                <div className="titulo">
                    <h1>Checkout</h1>
                    <h3>Dirección de envío</h3>
                </div>
                <form>
                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre" placeholder="Nombre del usuario" />
                        </div>
                        <div class="grupo-campo">
                            <label for="apellido">Apellido</label>
                            <input type="text" id="apellido" placeholder="Apellido del usuario" />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="ciudad">Ciudad</label>
                            <input type="text" id="ciudad" placeholder="Nombre de la ciudad" />
                        </div>
                        <div class="grupo-campo">
                            <label for="departamento">Departamento</label>
                            <input type="text" id="departamento" placeholder="Nombre de la ciudad" />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo-ancho-completo">
                            <label for="direccion">Dirección</label>
                            <input type="text" id="direccion" placeholder="Av. la molina 1233..." />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="codigo-postal">Código postal</label>
                            <input type="text" id="codigo-postal" placeholder="Código postal" />
                        </div>
                        <div class="grupo-campo">
                            <label for="telefono">Teléfono de contacto</label>
                            <input type="text" id="telefono" placeholder="Número de teléfono" />
                        </div>
                    </div>
                </form>
            </div> 
            <div className="editar-resumen">
            <ResumenCompra/>    
            </div>
        </div>  
        </>
    )
}


export default Checkout