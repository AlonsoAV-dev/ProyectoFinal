import "./agregarProducto.scss"
import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct";
import iconoImg from "../../../public/assets/icono-img.png"
import productosApi from "../../api/productoApi.js";

const AgregarProducto = ({categorias}) => {
    
    const productoObjeto = {
        nombre: "",
        presentacion: "",
        descripcion: "",
        precio: 0.00,
        categoria: "",
        stock: 0,
        img:""
    };

    const agregarProducto = async (e) => {
        e.preventDefault();
        const form = e.target;
        const nuevoProducto = {
            ...productoObjeto,
            nombre: form.nombre.value,
            presentacion: form.presentacion.value,
            descripcion: form.descripcion.value,
            precio:(Math.random() * (60 - 15) + 15).toFixed(2),
            categoria: form.categoria.value,
            stock: parseInt(form.stock.value, 10),
            img: form.archivo.files[0] ? URL.createObjectURL(form.archivo.files[0]) : "", // Crea una URL para la imagen si se selecciona
        };
        
        try {
            await productosApi.create(nuevoProducto);
            alert("Producto agregado exitosamente");
            form.reset();
        } catch (error) {
            console.error("Error al crear el producto:", error);
        };
    }

    return (
        <FormProduct onSubmit={agregarProducto} modo ={"AgregarProducto"} iconoImg= {iconoImg} categorias={categorias}/>
    );
};

export default AgregarProducto;