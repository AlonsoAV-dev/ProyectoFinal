import "./DashListaOrdenes.scss"
import apis from "../../api/ProductosApi"
const DashListaOrdenes = () => {
    const lista_pedidos = apis.ordenApi.obtenerOrdenes();
    const lista_usuarios= apis.usuarioApi.obtenerUsuarios();
    
    const BuscarUsuario = (id) =>{
        const user = lista_usuarios.find(u => u.id==id)
        return user ? user.nombre : "Usuario no encontrado";
    }
    
    return(
        <>
            <table class="tabla-ordenes">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Usuario</th>
                        <th>Fecha de orden</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {lista_pedidos.map((orden)=> (
                        <tr>
                            <td className="id_orden">#{orden.id}</td>
                            <td>{
                                BuscarUsuario(orden.usuarioId)
                                }</td>
                            <td>{orden.fecha}</td>
                            <td>{orden.total}</td>
                            <td><span class="estado-entregado">{orden.estado}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default DashListaOrdenes