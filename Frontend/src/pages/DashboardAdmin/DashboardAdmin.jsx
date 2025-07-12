import "./dashboardAdmin.scss";
import BotonesAdmin from "../../components/Botones/BotonesAdmin";
import DashRegistroUsuarios from "../../components/DashRegistroUsuarios/DashRegistroUsuarios";
import DashDetalleUsuarios from "../../components/DashDetalleUsuarios/DashDetalleUsuarios";
import DashListaOrdenes from "../../components/DashListaOrdenes/DashListaOrdenes";
import usuarioApi from "../../api/usuarioApi";
import ordenApi from "../../api/ordenApi";
import { useEffect, useState } from "react";

const DashboardAdmin = () => {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaOrdenes, setListaOrdenes] = useState([]);
    
    const handleLoad = async () => {
        const datosUsuarios = await usuarioApi.findAll();
        const datosOrdenes = await ordenApi.findAll();
        setListaUsuarios(datosUsuarios);
        setListaOrdenes(datosOrdenes);
    };
    const [activoId, setActivoId] = useState();
    const usuarioSeleccionado = listaUsuarios.find(usuario => usuario.id === activoId);
    useEffect(() => {
        handleLoad();
    }, []);

    const ingresoTotal = () => {
        let total = 0;
        listaOrdenes.forEach(orden => {
            if (orden.estado === "Entregado") {
                total += parseFloat(orden.total);
            }
        });
        return total.toFixed(2); 
    };
    
    return (
        <div className="dashboard-admin">
        <h1>Dashboard</h1>
            <div className="estadisticas">
                <div className="estadisticas-item">
                    <h2>Órdenes</h2>
                    <p>{listaOrdenes.length}</p>
                </div>
                <div className="estadisticas-item">
                    <h2>Usuarios nuevos</h2>
                    <p>{listaUsuarios.length}</p>
                </div>
                <div className="estadisticas-item" id="item-3">
                    <h2>Ingresos totales</h2>
                    <p>S/{ingresoTotal()}</p>
                </div>
            </div>
            <div className="totalUsuarios">
                <div className="UsuariosRegistrados">
                    <div className="encabezado-usuarios">
                        <h3>Usuarios registrados</h3>
                        <BotonesAdmin mode="Ver todos los usuarios" />
                    </div>
                    <div className="lista-usuarios">
                        <DashRegistroUsuarios 
                        lista_usuarios={listaUsuarios}
                        setListaUsuarios={setListaUsuarios}
                        activoId={activoId}
                        setActivoId={setActivoId}
                        />
                    </div>
                </div>
                <div className="detalleUsuario">
                    <h3>Detalle del usuario</h3>
                    <div className="perfil-usuario">
                        {usuarioSeleccionado && (
                            <DashDetalleUsuarios usuario={usuarioSeleccionado} />
                        )}
                    </div>
                </div>
            </div>
            <div className="listado-ordenes">
                <div className="encabezado-ordenes">
                        <h3>Listado de ordenes</h3>
                        <div className="botones">
                            <BotonesAdmin mode="Ver productos" />
                            <BotonesAdmin mode="Ver ordenes" />
                        </div>
                </div>
                <div className="lista-ordenes">
                    <DashListaOrdenes />
                </div>
            </div>

        </div>
    );
}


export default DashboardAdmin;