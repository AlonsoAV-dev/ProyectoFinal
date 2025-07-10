import { useState } from 'react';
import Swal from 'sweetalert2';
import './CambiarPassword.scss'; // Crearemos este archivo SCSS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Necesitarás instalar react-icons: npm install react-icons

// Simulación de contraseña actual (en una app real, esto se verificaría en el backend)
const CONTRASENA_ACTUAL_EJEMPLO = "password123";

function CambiarPassword() {
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    
    const [mostrarActual, setMostrarActual] = useState(false);
    const [mostrarNueva, setMostrarNueva] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const [error, setError] = useState('');

    const validarFortalezaPassword = (password) => {
        // Ejemplo: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        if (!contrasenaActual || !nuevaContrasena || !confirmarContrasena) {
            Swal.fire('Campos incompletos', 'Por favor, completa todos los campos.', 'error');
            return;
        }

        // Simulación de verificación de contraseña actual
        if (contrasenaActual !== CONTRASENA_ACTUAL_EJEMPLO) {
            setError('La contraseña actual es incorrecta.');
            Swal.fire('Error', 'La contraseña actual es incorrecta.', 'error');
            return;
        }

        if (!validarFortalezaPassword(nuevaContrasena)) {
            setError('La nueva contraseña no es segura. Debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
            Swal.fire('Contraseña Débil', 'La nueva contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.', 'warning');
            return;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las nuevas contraseñas no coinciden.');
            Swal.fire('Error', 'Las nuevas contraseñas no coinciden.', 'error');
            return;
        }

        // Simular cambio de contraseña
        console.log("Contraseña cambiada exitosamente a:", nuevaContrasena);
        // Aquí llamarías a la API para cambiar la contraseña.

        Swal.fire('¡Contraseña Cambiada!', 'Tu contraseña ha sido actualizada correctamente.', 'success');
        setContrasenaActual('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
    };

    return (
        <div className="cambiar-password-page">
            <h1>Cambiar Contraseña</h1>
            <div className="cambiar-password-container">
                <form onSubmit={handleSubmit} className="form-cambiar-password">
                    {error && <p className="error-message">{error}</p>}                    
                    <div className="form-group">
                        <label htmlFor="contrasenaActual">Contraseña Actual:</label>
                        <div className="password-input-wrapper">
                            <input
                                type={mostrarActual ? 'text' : 'password'}
                                id="contrasenaActual"
                                value={contrasenaActual}
                                onChange={(e) => setContrasenaActual(e.target.value)}
                                required
                            />
                            <span onClick={() => setMostrarActual(!mostrarActual)} className="toggle-password">
                                {mostrarActual ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nuevaContrasena">Nueva Contraseña:</label>
                        <div className="password-input-wrapper">
                            <input
                                type={mostrarNueva ? 'text' : 'password'}
                                id="nuevaContrasena"
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                required
                            />
                            <span onClick={() => setMostrarNueva(!mostrarNueva)} className="toggle-password">
                                {mostrarNueva ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <small className="password-requirements">
                            Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarContrasena">Confirmar Nueva Contraseña:</label>
                        <div className="password-input-wrapper">
                            <input
                                type={mostrarConfirmar ? 'text' : 'password'}
                                id="confirmarContrasena"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                required
                            />
                            <span onClick={() => setMostrarConfirmar(!mostrarConfirmar)} className="toggle-password">
                                {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn-cambiar-password">
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CambiarPassword; 