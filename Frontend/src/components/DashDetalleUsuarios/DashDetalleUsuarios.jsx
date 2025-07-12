import "./DashDetalleUsuarios.scss"
import apis from "../../api/ProductosApi"
import pedidosApi from "../../api/ordenApi"
import { useEffect, useState } from "react";

const DashDetalleUsuarios = ({usuario}) =>{

    const user = usuario;
    const [lista_pedidos, setListaPedidos] = useState([]);
    
    const handlePedidos = async () => {
        const datos = await pedidosApi.obtenerOrdenesPorUsuario(user.id);
        setListaPedidos(datos);
    }
    useEffect(() => {
        handlePedidos();
    }, [user.id]);
    
    return(
        <>

        <div className="perfil-user">
            <div className="info-user">
                <div className="datos-personales">
                    <h1>{user.nombre}</h1>  
                    <p><span>Correo:</span> {user.correo}</p>
                    <p><span>Fecha de registro:</span> {user.fechaRegistro}</p>
                    <p><span>Estado:</span> {user.estado}</p>
                </div>
                    <img src={user.img}/>
            </div>
            <div className="lista-pedidos-user">
                <table class="tabla-pedidos">
                    <thead>
                        <tr>
                            <th className="encabezado-id">#ID</th>
                            <th className="encabezado-fecha">Fecha</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista_pedidos.map((pedido) => (
                            <tr>
                                <td className="pedido-id"><a href="#">#{pedido.id}</a></td>
                                <td className="pedido-fecha">{pedido.fecha}</td>
                                <td>S/{pedido.total}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
        </>
    )
}


export default DashDetalleUsuarios;