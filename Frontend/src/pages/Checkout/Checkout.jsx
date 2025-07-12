import ResumenCompra from "../CarroCompras/ResumenCompra"
import "./Checkout.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ordenApi from '../../api/ordenApi';

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Estado del formulario
    const [datosEnvio, setDatosEnvio] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        departamento: '',
        direccion: '',
        codigoPostal: '',
        telefono: ''
    });

    const manejarCambio = (e) => {
        const { id, value } = e.target;
        setDatosEnvio(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const procesarOrden = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);
            
            // Obtener datos del carrito desde localStorage
            const resumen = JSON.parse(localStorage.getItem("resumen")) || {};
            const productos = resumen.productos || [];
            
            if (productos.length === 0) {
                throw new Error('El carrito está vacío');
            }
            
            // Datos de la orden
            const ordenData = {
                usuario_id: 1, // TODO: Obtener ID del usuario logueado
                productos: productos,
                total: resumen.total || 0,
                direccion_envio: {
                    nombre: datosEnvio.nombre,
                    apellido: datosEnvio.apellido,
                    direccion: datosEnvio.direccion,
                    ciudad: datosEnvio.ciudad,
                    departamento: datosEnvio.departamento,
                    codigo_postal: datosEnvio.codigoPostal,
                    telefono: datosEnvio.telefono
                }
            };
            
            // Crear orden usando la API
            const ordenCreada = await ordenApi.crearOrdenDesdeCarrito(1, ordenData);
            
            // Guardar ID de la orden para OrdenCompletada
            if (ordenCreada && ordenCreada.id) {
                localStorage.setItem("ultimaOrdenId", ordenCreada.id);
            }
            
            // Navegar a página de orden completada
            navigate('/OrdenCompletada');
            
        } catch (error) {
            console.error('Error al procesar orden:', error);
            setError(error.message || 'Error al procesar la orden');
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
        <div className="checkout">
            <div class="contenedor-formulario">
                <div className="titulo">
                    <h1>Checkout</h1>
                    <h3>Dirección de envío</h3>
                </div>
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
                
                <form onSubmit={procesarOrden}>
                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="nombre">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                placeholder="Nombre del usuario"
                                value={datosEnvio.nombre}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div class="grupo-campo">
                            <label for="apellido">Apellido</label>
                            <input 
                                type="text" 
                                id="apellido" 
                                placeholder="Apellido del usuario"
                                value={datosEnvio.apellido}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="ciudad">Ciudad</label>
                            <input 
                                type="text" 
                                id="ciudad" 
                                placeholder="Nombre de la ciudad"
                                value={datosEnvio.ciudad}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div class="grupo-campo">
                            <label for="departamento">Departamento</label>
                            <input 
                                type="text" 
                                id="departamento" 
                                placeholder="Nombre del departamento"
                                value={datosEnvio.departamento}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo-ancho-completo">
                            <label for="direccion">Dirección</label>
                            <input 
                                type="text" 
                                id="direccion" 
                                placeholder="Av. la molina 1233..."
                                value={datosEnvio.direccion}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div class="fila-formulario">
                        <div class="grupo-campo">
                            <label for="codigoPostal">Código postal</label>
                            <input 
                                type="text" 
                                id="codigoPostal" 
                                placeholder="Código postal"
                                value={datosEnvio.codigoPostal}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div class="grupo-campo">
                            <label for="telefono">Teléfono de contacto</label>
                            <input 
                                type="text" 
                                id="telefono" 
                                placeholder="Número de teléfono"
                                value={datosEnvio.telefono}
                                onChange={manejarCambio}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    
                    <div class="fila-formulario" style={{ marginTop: '20px' }}>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '15px',
                                backgroundColor: loading ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '16px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Procesando orden...' : 'Finalizar compra'}
                        </button>
                    </div>
                </form>
            </div> 
            <div className="editar-resumen">
            <ResumenCompra/>    
            </div>
        </div>  
        </>
    )
}


export default Checkout