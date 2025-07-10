import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct";
import { useParams } from "react-router-dom";
import productosApi from "../../api/productoApi.js";
import { useState, useEffect } from "react";

const DetalleProducto = () => {

    const {id} = useParams();
    const [productoEncontrado, setProductoEncontrado] = useState(null);

    const load = async () =>{
        const data = await productosApi.findOne(id);
        setProductoEncontrado(data);
    }

    useEffect(() => {
        load();
    }, []);

    if (!productoEncontrado) return <p>Cargando producto...</p>; // 👈 Asegúrate que haya data


    const modo = "Detalle Producto";
    const iconoImg = productoEncontrado.imagen;

    const detalleProducto = (e) => {
        e.preventDefault();
        const form = e.target;
        const productoEditado = {
            id: productoEncontrado.id,
            nombre: form.nombre.value,
            presentacion: form.presentacion.value,
            descripcion: form.descripcion.value,
            categoria: form.categoria.value,
            stock: parseInt(form.stock.value, 10),
            img: iconoImg,
        };
    }
    return (
        <>   
        <FormProduct onSubmit={detalleProducto} modo={modo} iconoImg={productoEncontrado.imagen} producto={productoEncontrado} />         

       </> 
    );
    
}

export default DetalleProducto;
