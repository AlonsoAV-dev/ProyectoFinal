import "./DashboardAdmin.scss";
import BotonesAdmin from "../../components/Botones/BotonesAdmin";
import DashRegistroUsuarios from "../../components/DashRegistroUsuarios/DashRegistroUsuarios";
import DashDetalleUsuarios from "../../components/DashDetalleUsuarios/DashDetalleUsuarios";
import DashListaOrdenes from "../../components/DashListaOrdenes/DashListaOrdenes";

const DashboardAdmin = () => {

    return (
        <div className="dashboard-admin">
        <h1>Dashboard</h1>
            <div className="estadisticas">
                <div className="estadisticas-item">
                    <h2>Órdenes</h2>
                    <p>150</p>
                </div>
                <div className="estadisticas-item">
                    <h2>Usuarios nuevos</h2>
                    <p>12</p>
                </div>
                <div className="estadisticas-item" id="item-3">
                    <h2>Ingresos totales</h2>
                    <p>S/2348.00</p>
                </div>
            </div>
            <div className="totalUsuarios">
                <div className="UsuariosRegistrados">
                    <div className="encabezado-usuarios">
                        <h3>Usuarios registrados</h3>
                        <BotonesAdmin mode="Ver todos los usuarios" />
                    </div>
                    <div className="lista-usuarios">
                        <DashRegistroUsuarios/>
                    </div>
                </div>
                <div className="detalleUsuario">
                    <h3>Detalle del usuario</h3>
                    <div className="perfil-usuario">
                        <DashDetalleUsuarios></DashDetalleUsuarios>
                    </div>
                </div>
            </div>
            <div className="listado-ordenes">
                <div className="encabezado-ordenes">
                        <h3>Listado de ordenes</h3>
                        <div className="botones">
                            <BotonesAdmin mode="Ver productos" />
                            <BotonesAdmin mode="Ver todas las ordenes" />
                        </div>
                </div>
                <div className="lista-ordenes">
                    <DashListaOrdenes/>
                </div>
            </div>

        </div>
    );
}


export default DashboardAdmin;