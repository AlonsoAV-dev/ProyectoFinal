import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './DatosUsuario.scss'; // Crearemos este archivo SCSS

// Recibe usuarioOriginal y onGuardarCambios como props
function DatosUsuario({ usuarioOriginal, onGuardarCambios }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (usuarioOriginal) {
            setNombre(usuarioOriginal.nombre || '');
            setApellido(usuarioOriginal.apellido || '');
            setCorreo(usuarioOriginal.correo || '');
            setIsLoading(false);
        } else {
            // Manejar caso de que usuarioOriginal no esté definido inicialmente
            setIsLoading(true); // O mostrar un mensaje de error/carga
        }
    }, [usuarioOriginal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !apellido.trim() || !correo.trim()) {
            Swal.fire('Campos incompletos', 'Por favor, completa todos los campos.', 'error');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(correo)) {
            Swal.fire('Correo inválido', 'Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Llama a la función de App.jsx para actualizar los datos en la "API" y en App
        onGuardarCambios({ 
            nombre: nombre.trim(), 
            apellido: apellido.trim(), 
            correo: correo.trim() 
        });

        Swal.fire('¡Datos Actualizados!', 'Tu información ha sido actualizada correctamente.', 'success');
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        // Restaura los campos a los valores originales de la prop
        if (usuarioOriginal) {
            setNombre(usuarioOriginal.nombre || '');
            setApellido(usuarioOriginal.apellido || '');
            setCorreo(usuarioOriginal.correo || '');
        }
        setIsEditing(false);
    };

    if (isLoading && !isEditing) { // Solo muestra cargando si no está en modo edición y los datos iniciales aún no llegan
        return <div className="datos-usuario-page loading">Cargando tus datos...</div>;
    }
    // Si entra en modo edición directamente, o si los datos ya cargaron
    if (!isEditing && !isLoading) {
        // Mostrar vista de datos si no está editando y los datos están cargados
    } else if (!isEditing && isLoading) {
        // Si aún está cargando y no se ha entrado al modo de edición, podría mostrar el loader.
        // Este caso está cubierto por el if (isLoading && !isEditing) anterior.
    }

    return (
        <div className="datos-usuario-page">
            <h1>Mis Datos Personales</h1>
            <div className="datos-usuario-container">
                {!isEditing ? (
                    <div className="vista-datos">
                        <div className="dato-item">
                            <span className="dato-label">Nombre:</span>
                            <span className="dato-valor">{nombre}</span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Apellido:</span>
                            <span className="dato-valor">{apellido}</span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Correo Electrónico:</span>
                            <span className="dato-valor">{correo}</span>
                        </div>
                        <button onClick={() => setIsEditing(true)} className="btn-editar-datos">
                            Editar Datos
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="form-datos-usuario">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido:</label>
                            <input
                                type="text"
                                id="apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder="Tu apellido"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="tu.correo@example.com"
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-guardar-cambios">
                                Guardar Cambios
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="btn-cancelar-edicion">
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DatosUsuario; 