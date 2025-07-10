import Swal from "sweetalert2";
import "./MostrarAlerta.scss"
import productosApi from "../../api/productoApi.js";
const EliminarProducto = async ({id, productos, setProductos}) =>{

    await productosApi.remove(id);
    const productosActualizados = productos.filter((producto) => producto.id !== id);
    setProductos(productosActualizados);

};
export const MostrarAlerta = ({ nombre, id, productos, setProductos, handleLoadProductos }) => {
        Swal.fire({
            html: `
            <h2 id="eliminar-produc">Eliminar producto</h2>
            <div class="contenedor-alerta">
                <div class="icono-x">✖</div>
                <div class="alerta-horizontal">           
                    <div class="contenido-texto">
                    <p>¿Estás seguro que deseas eliminar el producto "<b>${nombre}</b>" ?</p>
                        </div>
                </div>
            </div>
            `,
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, eliminar",
            confirmButtonColor: "#FE624C",
            denyButtonColor: "#D9D9D9",
            width: "800px",
            heightAuto: false,
            customClass: {
                popup: "popup-custom",
                confirmButton: "btn-eliminar",
                denyButton: "btn-eliminar-2"
            },
        }).then(async response =>{
            if(response.isConfirmed){
                await productosApi.remove(id);
                if(handleLoadProductos){
                    await handleLoadProductos();
                }
                Swal.fire({title:"Exito",
                    icon:'success',
                    text:'El producto fue eliminado exitosamente.',
                    confirmButtonColor: "#FE624C",
                });
            }
        }) 
};
