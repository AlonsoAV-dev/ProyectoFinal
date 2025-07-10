import "./agregarProducto.scss"
import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct";
import iconoImg from "../../../public/assets/icono-img.png"

const AgregarProducto = ({ lista_productos, setLista_Productos }) => {
    
    const productoObjeto = {
        id: "",
        nombre: "",
        presentacion: "",
        descripcion: "",
        categoria: "",
        stock: 0,
        img:""
    };

    const agregarProducto = (e) => {
        e.preventDefault();
        const form = e.target;
        const nuevoProducto = {
            ...productoObjeto,
            id: `${Math.floor(Math.random() * 10000)}`, // Genera un ID aleatorio
            nombre: form.nombre.value,
            presentacion: form.presentacion.value,
            descripcion: form.descripcion.value,
            categoria: form.categoria.value,
            stock: parseInt(form.stock.value, 10),
            img: form.archivo.files[0] ? URL.createObjectURL(form.archivo.files[0]) : "", // Crea una URL para la imagen si se selecciona
        };
        
        setLista_Productos([...lista_productos, nuevoProducto]);
        form.reset();
    }

    return (
        <FormProduct onSubmit={agregarProducto} modo ={"AgregarProducto"} iconoImg= {iconoImg}/>
    );
};

export default AgregarProducto;