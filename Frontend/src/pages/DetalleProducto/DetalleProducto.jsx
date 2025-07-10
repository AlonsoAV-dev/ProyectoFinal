import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct";
import { useParams } from "react-router-dom";
 

const DetalleProducto = ({lista_productos, setLista_Productos}) => {

    const {id} = useParams();
    let productoEncontrado= lista_productos.find((producto) => producto.id == id);
    const modo = "Detalle Producto";
    const iconoImg = productoEncontrado.img;

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
        <FormProduct onSubmit={detalleProducto} modo={modo} iconoImg={"."+iconoImg} producto={productoEncontrado} />         

       </> 
    );
    
}

export default DetalleProducto;
