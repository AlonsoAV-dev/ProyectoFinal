import ResumenCompra from "../CarroCompras/ResumenCompra";
import "./Checkout.scss";
import { useState } from "react";
import userApi from "../../api/usuarioApi.js";

const Checkout = () => {
  const [datosEnvio, setDatosEnvio] = useState(null);
    const usuarioId = userApi.getUserSession()?.id; // ✅ correcto

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      idUsuario: usuarioId, // o cámbialo según el usuario logueado
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      ciudad: e.target.ciudad.value,
      departamento: e.target.departamento.value,
      direccion: e.target.direccion.value,
      codigoPostal: e.target.codigo_postal.value,
      telefono: e.target.telefono.value,
    };

    setDatosEnvio(datos); // opcional, útil si necesitas mostrar antes
    localStorage.setItem("datosEnvio", JSON.stringify(datos)); // guarda de forma persistente

    alert("✅ Dirección guardada. Continúa con el método de pago.");
  };

  return (
    <div className="checkout">
      <div className="contenedor-formulario">
        <div className="titulo">
          <h1>Checkout</h1>
          <h3>Dirección de envío</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="fila-formulario">
            <div className="grupo-campo">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Nombre del usuario" required />
            </div>
            <div className="grupo-campo">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" id="apellido" placeholder="Apellido del usuario" required />
            </div>
          </div>

          <div className="fila-formulario">
            <div className="grupo-campo">
              <label htmlFor="ciudad">Ciudad</label>
              <input type="text" id="ciudad" placeholder="Nombre de la ciudad" required />
            </div>
            <div className="grupo-campo">
              <label htmlFor="departamento">Departamento</label>
              <input type="text" id="departamento" placeholder="Nombre del departamento" required />
            </div>
          </div>

          <div className="fila-formulario">
            <div className="grupo-campo-ancho-completo">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" placeholder="Av. la molina 1233..." required />
            </div>
          </div>

          <div className="fila-formulario">
            <div className="grupo-campo">
              <label htmlFor="codigo_postal">Código postal</label>
              <input type="text" id="codigo_postal" placeholder="Código postal" required />
            </div>
            <div className="grupo-campo">
              <label htmlFor="telefono">Teléfono de contacto</label>
              <input type="text" id="telefono" placeholder="Número de teléfono" required />
            </div>
          </div>

          <div className="fila-formulario">
            <button type="submit" className="boton-enviar">Confirmar dirección</button>
          </div>
        </form>
      </div>

      <div className="editar-resumen">
        <ResumenCompra />
      </div>
    </div>
  );
};

export default Checkout;
