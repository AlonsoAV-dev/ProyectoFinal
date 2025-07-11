import "./DashRegistroUsuarios.scss"
import usuarioApi from "../../api/usuarioApi";
import { useEffect, useState } from "react";

const DashRegistroUsuarios = ( {lista_usuarios, setListaUsuarios,activoId,setActivoId}) =>{
    const handleUsuarios = async () => {
        const datos = await usuarioApi.findAll();
        setListaUsuarios(datos);
        if (datos.length > 0) {
            setActivoId(datos[0].id);
        }
    }

    useEffect(() => {
        handleUsuarios();
    }, []);

    const changeEstado = async (id, nuevoEstado) => {
        await usuarioApi.update({ id, estado: nuevoEstado });
        setListaUsuarios(prevUsuarios => 
            prevUsuarios.map(usuario => 
                usuario.id == id ? { ...usuario, estado: nuevoEstado } : usuario
            )
        );
    };

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
                lista_usuarios.slice(0, 7).map((usuario)=>(
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
                                    (<button onClick={() => changeEstado(usuario.id, "Inactivo")} className="acciones-usuarios">Desactivar</button>) 
                                    : 
                                    (<button onClick={() => changeEstado(usuario.id, "Activo")} className="acciones-usuarios">Activar</button>)
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