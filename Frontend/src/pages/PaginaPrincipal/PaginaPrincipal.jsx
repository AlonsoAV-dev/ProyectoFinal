import { useState } from 'react';
import './PaginaPrincipal.scss';
import { Link } from 'react-router-dom';
import ordenesEjemplo from '../../api/ordenesData';

function PaginaPrincipal({ usuario }) {
    const ordenes = ordenesEjemplo;

    const direnvio = {
        direccion: 'Av. La Molina 123',
        telefonocontacto: '991264864'
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const ordenesPorPagina = 5;
    const indiceInicio = (paginaActual - 1) * ordenesPorPagina;
    const indiceFin = indiceInicio + ordenesPorPagina;
    const ordenesPagina = ordenes.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(ordenes.length / ordenesPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    if (!usuario) {
        return <div>Cargando datos del usuario...</div>;
    }

    return (
        <div className="pagina-principal">
            <h2 className="texto-bienvenida">Hola {usuario.nombre} {usuario.apellido}!</h2>

            <div className="seccion-info-usuarios">
                <div className="seccion-izquierda">
                    <div className="info-card datos-personales">
                        <h3>Datos personales</h3>
                        <div className="info-contenido">
                            <p><span>Nombre:</span> {usuario.nombre} {usuario.apellido}</p>
                            <p><span>Correo:</span> {usuario.correo}</p>
                            <p><span>Fecha de registro:</span>{usuario.fecha_registro}</p>
                        </div>
                        <div className="botones-usuario">
                            <Link to="/mis-datos" className="btn-accion-usuario">
                                Ver/Editar Datos
                            </Link>
                            <Link to="/cambiar-contrasena" className="btn-accion-usuario">
                                Cambiar Contraseña
                            </Link>
                        </div>
                    </div>

                    <div className="info-card direccion-envio">
                        <h3>Dirección de envío</h3>
                        <div className="info-contenido">
                            <p>{direnvio.direccion}</p>
                            <p>Telefono de contacto: {direnvio.telefonocontacto}</p>
                        </div>
                    </div>
                </div>

                <div className="seccion-derecha">
                    <div className="stats-container">
                        <div className="stat-card ordenes">
                            <span className="valor">{ordenes.length}</span>
                            <span className="texto">Órdenes</span>
                        </div>
                        <div className="stat-card monto">
                            <span className="valor">S/129</span>
                            <span className="texto">Monto ahorrado</span>
                        </div>
                    </div>

                    <div className="imagen-usuario">
                        <img src="/assets/image 37.png" alt="User"/>
                    </div>
                </div>
            </div>

            <div className="seccion-ordenes">
                <h3>Tus órdenes</h3>
                <div className="buscar-orden">
                    <input type="text" placeholder="Buscar una orden..." />
                    <button>Buscar</button>
                </div>
                <div className="tabla-ordenes">
                    <table>
                        <thead>
                            <tr>
                                <th>Orden</th>
                                <th>Usuario</th>
                                <th>Fecha de orden</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenesPagina.map((orden) => (
                                <tr key={orden.id}>
                                    <td className="orden-id">#{orden.id}</td>
                                    <td>{orden.usuario}</td>
                                    <td>{orden.fecha}</td>
                                    <td>S/ {orden.total.toFixed(2)}</td>
                                    <td>{orden.estado}</td>
                                    <td>
                                        <Link to={`/orden/${orden.id}`} className="ver-detalles">
                                            Ver detalles
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        Anterior
                    </button>

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaginaPrincipal;