import { useState, useEffect } from 'react';
import './PaginaPrincipal.scss';
import { Link } from 'react-router-dom';
import ordenApi from '../../api/ordenApi';

function PaginaPrincipal({ usuario }) {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Datos de envío del usuario (desde la base de datos)
    const direnvio = {
        direccion: usuario?.direccion || 'No especificada',
        telefonocontacto: usuario?.telefono || 'No especificado'
    };

    // Cargar órdenes del usuario actual
    useEffect(() => {
        if (usuario && usuario.id) {
            cargarOrdenesUsuario();
        }
    }, [usuario]);

    const cargarOrdenesUsuario = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Obtener órdenes del usuario específico
            const ordenesUsuario = await ordenApi.obtenerOrdenesPorUsuario(usuario.id);
            
            if (Array.isArray(ordenesUsuario)) {
                // Formatear datos para el componente (mantener estructura original)
                const ordenesFormateadas = ordenesUsuario.map(orden => ({
                    id: orden.id,
                    usuario: `${usuario.nombre} ${usuario.apellido}`,
                    fecha: new Date(orden.fecha).toLocaleDateString('es-ES'),
                    total: parseFloat(orden.total),
                    estado: orden.estado || 'Pendiente'
                }));
                
                setOrdenes(ordenesFormateadas);
            } else {
                setOrdenes([]);
            }
        } catch (error) {
            console.error('Error al cargar órdenes del usuario:', error);
            setError('Error al cargar las órdenes');
            setOrdenes([]);
        } finally {
            setLoading(false);
        }
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);

    // Filtrar órdenes por búsqueda
    useEffect(() => {
        if (!terminoBusqueda.trim()) {
            setOrdenesFiltradas(ordenes);
        } else {
            const filtradas = ordenes.filter(orden => 
                orden.id.toString().includes(terminoBusqueda) ||
                orden.estado.toLowerCase().includes(terminoBusqueda.toLowerCase())
            );
            setOrdenesFiltradas(filtradas);
        }
        setPaginaActual(1); // Resetear paginación al buscar
    }, [ordenes, terminoBusqueda]);

    const ordenesPorPagina = 5;
    const indiceInicio = (paginaActual - 1) * ordenesPorPagina;
    const indiceFin = indiceInicio + ordenesPorPagina;
    const ordenesPagina = ordenesFiltradas.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(ordenesFiltradas.length / ordenesPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    const buscarOrden = () => {
        // La búsqueda se hace automáticamente con el useEffect
        // Este método puede usarse para lógica adicional si se necesita
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
                            <p><span>Fecha de registro:</span> {usuario.fechaRegistro}</p>
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
                            <span className="valor">{loading ? '...' : ordenes.length}</span>
                            <span className="texto">Órdenes</span>
                        </div>
                    </div>

                    <div className="imagen-usuario">
                        <img src={usuario?.img || "/assets/image 37.png"} alt="User"/>
                    </div>
                </div>
            </div>

            <div className="seccion-ordenes">
                <h3>Tus órdenes</h3>
                
                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        ⚠️ {error}
                    </div>
                )}
                
                <div className="buscar-orden">
                    <input 
                        type="text" 
                        placeholder="Buscar una orden..." 
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                    />
                    <button onClick={buscarOrden}>Buscar</button>
                </div>
                <div className="tabla-ordenes">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <p>Cargando tus órdenes...</p>
                        </div>
                    ) : (
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
                                {ordenesPagina.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                            {terminoBusqueda ? 'No se encontraron órdenes con ese criterio' : 'No tienes órdenes registradas'}
                                        </td>
                                    </tr>
                                ) : (
                                    ordenesPagina.map((orden) => (
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                
                {!loading && ordenesFiltradas.length > ordenesPorPagina && (
                    <div className="paginacion">
                        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                            Anterior
                        </button>
                        <span style={{ margin: '0 15px', color: '#666' }}>
                            Página {paginaActual} de {totalPaginas}
                        </span>
                        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaginaPrincipal;