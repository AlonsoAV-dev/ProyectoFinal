import "./DashListaOrdenes.scss"
import ordenesApi from "../../api/ordenApi";
import usuariosApi from "../../api/usuarioApi";

import { useEffect, useState } from "react";

const DashListaOrdenes = () => {
    const [lista_pedidos, setListaPedidos] = useState([]);
    const [lista_usuarios, setListaUsuarios] = useState([]);
    const handleLoad = async () => {
        const datosPedidos = await ordenesApi.findAll();
        const datosUsuarios = await usuariosApi.findAll();
        setListaPedidos(datosPedidos);
        setListaUsuarios(datosUsuarios);
    }
    useEffect(() => {
        handleLoad();
    }, []);

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
                    {lista_pedidos.slice(1, 8).map((orden)=> (
                        <tr>
                            <td className="id_orden">#{orden.id}</td>
                            <td>{
                                BuscarUsuario(orden.idUsuario)
                                }</td>
                            <td>{orden.fecha}</td>
                            <td>S/{orden.total}</td>
                            <td>
                                <span style={{ color: orden.estado === "Entregado" ? "green" : "red" }}>
                                    {orden.estado}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default DashListaOrdenes