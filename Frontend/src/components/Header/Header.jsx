import "./Header.scss"
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ usuario, onActualizarUsuario }) {
    const navigate = useNavigate();
    const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);

    const handleCerrarSesion = () => {
        // Limpiar usuario usando la función del padre (App.jsx)
        if (onActualizarUsuario) {
            onActualizarUsuario(null);
        }
        navigate('/login');
    };
=======
import { Link } from "react-router-dom";
import carritoApi from "../../api/carritoApi.js";
function Header() {
    const usuarioId = 1; // Cambia esto según tu lógica de usuario
    


>>>>>>> origin/AlonsoAV-dev
    return (
        <div className="header">
            <div className="left-header">
                <Link to="/">
                    <div>
                        <p className="logo">
                            Mi-Tiendita<span>.</span>
                        </p>
                    </div>
                </Link>
            </div>
            <div className="search">
                <input type="text" placeholder="Buscar un producto..."/>
                <div className="search-icon">
                    <img src="/assets/Vector.png" alt="" />
                </div>
            </div> 
            <div className="right-header">
                <Link to="./carrito">
                    <div className="cart-info">
                        <img src="/assets/carrito.png" alt="" className="icon-cart"/>
                        <div>
                            <p className="p-carrito">Carrito</p>
                            <p className="p-precio">S/ 100.00</p>
                        </div>
                    </div>
                </Link>
                {usuario ? (
                    <div 
                        className="user-info" 
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
                    >
                        <img src="/assets/user.png" alt="" className="icon-user"/>
                        <div>
                            <p className="p-user">{usuario.nombre}</p>
                            <p className="p-cuenta">Mi cuenta</p>
                        </div>
                        
                        {mostrarMenuUsuario && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                padding: '10px',
                                minWidth: '150px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                zIndex: 1000
                            }}>
                                <Link 
                                    to="/pagina-principal" 
                                    style={{ 
                                        display: 'block', 
                                        padding: '8px 0', 
                                        textDecoration: 'none', 
                                        color: '#333',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => setMostrarMenuUsuario(false)}
                                >
                                    📊 Mi Panel
                                </Link>
                                <Link 
                                    to="/mis-datos" 
                                    style={{ 
                                        display: 'block', 
                                        padding: '8px 0', 
                                        textDecoration: 'none', 
                                        color: '#333',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => setMostrarMenuUsuario(false)}
                                >
                                    ⚙️ Mis Datos
                                </Link>
                                <Link 
                                    to="/cambiar-contrasena" 
                                    style={{ 
                                        display: 'block', 
                                        padding: '8px 0', 
                                        textDecoration: 'none', 
                                        color: '#333',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => setMostrarMenuUsuario(false)}
                                >
                                    🔒 Cambiar Contraseña
                                </Link>
                                <button 
                                    onClick={handleCerrarSesion}
                                    style={{ 
                                        display: 'block', 
                                        width: '100%',
                                        padding: '8px 0', 
                                        background: 'none',
                                        border: 'none',
                                        color: '#e74c3c',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    🚪 Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/login'>
                        <div className="user-info">
                            <img src="/assets/user.png" alt="" className="icon-user"/>
                            <div>
                                <p className="p-user">Iniciar Sesión</p>
                                <p className="p-cuenta">cuenta</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header;