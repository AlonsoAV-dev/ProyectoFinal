import deleteImg from "../../../public/assets/delete2.png";
import "./ProductosCarrito.scss"

const ProductoCarrito = ({ producto, cantidad, cambiarCantidad, soloLectura = false, eliminarItem  }) => {
  return (
    <div className="descripcion-compra">
      <button className="boton-check">✔</button>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="nombre-producto">
        <p><b>{producto.nombre}</b></p>
        <span className="presentacion">Presentación: {producto.presentacion}</span>
        <span className="estilo-llegada">Llega mañana</span>
      </div>
      <div className="precio">
        <h2>S/ {(producto.precio * cantidad).toFixed(2)}</h2>

        {soloLectura ? (
          <p className="solo-cantidad">Cantidad: {cantidad}</p>
        ) : (
          <div className="aumentar-cantidad">
            <span className="cantidad">Cantidad</span>
            <button onClick={() => cambiarCantidad(1)} className="operacion">+</button>
            <div className="unidades"><p>{cantidad}</p></div>
            <button
              onClick={() => cambiarCantidad(-1)}
              disabled={cantidad === 1}
              className="operacion"
            >-</button>
            <img
              src={deleteImg}
              alt="eliminar"
              className="eliminar"
              onClick={eliminarItem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoCarrito;
