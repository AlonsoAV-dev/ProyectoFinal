import Swal from "sweetalert2";
import "./MostrarAlerta.scss"


const EliminarProducto = ({id, productos, setProductos}) =>{

    const nuevosProductos = productos.filter(p => p.id !== id);

    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    setProductos(nuevosProductos);
};
export const MostrarAlerta = ({ nombre, id, productos, setProductos }) => {
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
        }).then(response =>{
            if(response.isConfirmed){
                Swal.fire({title:"Exito",
                    icon:'success',
                    text:'El producto fue eliminado exitosamente.',
                    confirmButtonColor: "#FE624C",
                });
                
                EliminarProducto({id, productos,setProductos });
            }
        }) 
};
