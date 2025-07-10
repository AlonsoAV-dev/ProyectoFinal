import { useParams } from "react-router-dom";
import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct"

const EditarProducto = ({lista_productos, setLista_Productos}) => {

    const {id} = useParams();
    let productoEncontrado= lista_productos.find((producto) => producto.id == id);
    const modo = "EditarProducto";
    const iconoImg = productoEncontrado.img;

    const editarProducto = (e) => {
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
        // Aquí podrías actualizar el producto en la lista de productos
        const productosActualizados = lista_productos.map(producto => 
            producto.id === productoEncontrado.id ? productoEditado : producto
        );
        setLista_Productos(productosActualizados);
        console.log("Producto editado:", productoEncontrado);
    };

    return (
        <>
            <FormProduct onSubmit={editarProducto} modo={modo} iconoImg={"."+iconoImg} producto={productoEncontrado} />         
        </>
    )
}

export default EditarProducto;