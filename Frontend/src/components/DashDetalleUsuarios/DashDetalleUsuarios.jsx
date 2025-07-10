import "./DashDetalleUsuarios.scss"
import apis from "../../api/ProductosApi"

const DashDetalleUsuarios = () =>{

    const lista_user = apis.usuarioApi.obtenerUsuarios();
    const user=lista_user[0];
    const lista_pedidos = apis.ordenApi.obtenerOrdenes();
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