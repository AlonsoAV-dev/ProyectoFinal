import "./DashRegistroUsuarios.scss"
import api from "../../api/ProductosApi";
import { useEffect, useState } from "react";

const DashRegistroUsuarios = () =>{
    const usuarios = api.usuarioApi;
    const [lista_usuarios, setLista_usuarios] = useState(() => {
        return usuarios.obtenerUsuarios();
    });

    useEffect(() => {    
        usuarios.guardarUsuarios(lista_usuarios);        
    },[lista_usuarios]);
    
    const [activoId, setActivoId] = useState(null);

    return(
        <>
        <table className="tablaUsuarios-admin">
            <thead>
                <tr>
                <th className="nombre">Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                lista_usuarios.map((usuario)=>(
                    <tr >
                        <td className="nombre2"> 
                            <img src={usuario.img} alt={usuario.nombre} /> {usuario.nombre}
                        </td>
                        {usuario.estado == "Activo"? 
                            (<td className="estado2"> {usuario.estado}</td>) 
                            : 
                            (<td className="estado3"> {usuario.estado}</td>)
                        }
                        <td>
                            <div className="acciones-iconos">                                                                                            
                                {usuario.estado == "Activo"? 
                                    (<button className="acciones-usuarios">Desactivar</button>) 
                                    : 
                                    (<button className="acciones-usuarios">Activar</button>)
                                }
                                <button  className={
                                    activoId === usuario.id ? "boton-activo" : "boton-inactivo"
                                    }
                                    onClick={() =>
                                    setActivoId(activoId === usuario.id ? null : usuario.id)
                                    } >Ver detalle
                            </button>                     
                            </div>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>                
        </>
    )
}
export default DashRegistroUsuarios;