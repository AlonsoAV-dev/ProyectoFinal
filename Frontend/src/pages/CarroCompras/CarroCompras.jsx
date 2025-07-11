import "./CarroCompras.scss";
import polloImg from "../../../public/assets/Pollo.png";
import deleteImg from "../../../public/assets/delete2.png";
import ResumenCompra from "./ResumenCompra";
import { useState } from "react";
import ProductoCarrito from "../ProductosCarrito/ProductosCarrito";

const CarroCompras = ({lista_productos}, setLista_Productos) => {
    const [cantidades, setCantidades] = useState({});
    function cambiarCantidad(id, op) {
        const actual = cantidades[id] ?? 1;  
        const nueva = Math.max(actual + op, 0);
        
        const copia = { ...cantidades };
        copia[id] = nueva;
        setCantidades(copia);
    }
    const subtotal = lista_productos.reduce((suma, producto) => {
        const cantidad = cantidades[producto.id] ?? 1;
        return suma + producto.precio * cantidad;
    }, 0);

    const cantidadTotal = lista_productos.reduce((suma, producto) => {
        const cantidad = cantidades[producto.id] ?? 1;
        return suma + cantidad;
    }, 0);

    const descuentoPorcentaje = 0.10; 
    const descuento = subtotal * descuentoPorcentaje;
    const total = subtotal - descuento;

    const productosSeleccionados = lista_productos.map((p) => ({
    ...p,
    cantidad: cantidades[p.id] ?? 1
    }));

    localStorage.setItem("resumen", JSON.stringify({
        subtotal,
        descuento,
        total,
        cantidadTotal,
        productos: productosSeleccionados
    }));

    return (
        <>
            <div className="carro-compras">
                <div className="carro">
                    <div className="titulo">
                        <h1>Compra</h1>
                        <p>(10 productos)</p>
                    </div>
                    
                    <div className="productos-carrito">
                        {lista_productos.map((producto)=> (
                            <ProductoCarrito      
                            producto={producto}
                            cantidad={cantidades[producto.id] ?? 1}
                            cambiarCantidad={cambiarCantidad}
                            soloLectura={false}
                            />
                        ))
                        }   
                    </div>
                </div>
                
                <ResumenCompra modo="Continuar compra" />
            </div>           
        </>
    )
}

export default CarroCompras;