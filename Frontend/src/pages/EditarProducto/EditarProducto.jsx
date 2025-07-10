import { useParams } from "react-router-dom";
import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct"
import { useState, useEffect } from "react";
import productosApi from "../../api/productoApi"; // Asegúrate de que la ruta sea correcta
const EditarProducto = () => {

    const {id} = useParams();
    
    const[productoEncontrado, setProductoEncontrado] = useState(null);

    const load = async () => {
        const data = await productosApi.findOne(id);
        setProductoEncontrado(data);
    }
    
    useEffect(() => {
        load();
    }, []);

    if (!productoEncontrado) return <p>Cargando producto...</p>; // 👈 Asegúrate que haya data

    const modo = "EditarProducto";
    const iconoImg = productoEncontrado.imagen;
    console.log("imagen encontrado:", iconoImg);
    const editarProducto = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productoEditado = {
            id: productoEncontrado.id,
            nombre: form.nombre.value,
            presentacion: form.presentacion.value,
            descripcion: form.descripcion.value,
            categoria: form.categoria.value,
            precio: productoEncontrado.precio,
            stock: parseInt(form.stock.value, 10),
            imagen: iconoImg,
        };
        
        // Aquí podrías actualizar el producto en la lista de productos
        // Por ejemplo, si tienes una función para actualizar el producto en tu API:
        await productosApi.update(productoEditado);
        // Actualiza el estado del producto encontrado
        console.log("Producto editado:", productoEncontrado);
    };

    return (
        <>
            <FormProduct onSubmit={editarProducto} modo={modo} iconoImg={iconoImg} producto={productoEncontrado} />         
        </>
    )
}

export default EditarProducto;