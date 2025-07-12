import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import usuarioApi from '../../api/usuarioApi'

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    const { nombre, apellido, email, dni, direccion, ciudad, telefono, password, confirmPassword } = formData;
    
    if (!nombre.trim() || !apellido.trim() || !email.trim() || !dni.trim() || !password.trim() || !confirmPassword.trim()) {
      throw new Error('Por favor, completa todos los campos obligatorios.');
    }

    if (!direccion.trim() || !ciudad.trim() || !telefono.trim()) {
      throw new Error('Por favor, completa tu dirección, ciudad y teléfono.');
    }

    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden.');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    if (!/^\d{8}$/.test(dni)) {
      throw new Error('El DNI debe tener exactamente 8 dígitos.');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Por favor, ingresa un email válido.');
    }

    if (!/^\d{9}$/.test(telefono)) {
      throw new Error('El teléfono debe tener exactamente 9 dígitos.');
    }
  };

  const logicaregistro = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      // Validar formulario
      validarFormulario();
      
      // Preparar datos para enviar
      const { confirmPassword, ...userData } = formData;
      
      // Registrar usuario usando API
      const usuarioCreado = await usuarioApi.register(userData);
      
      // Guardar sesión del usuario
      usuarioApi.saveUserSession(usuarioCreado);
      
      // Navegar a página principal
      navigate('/pagina-principal');
      
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register'>
      <div className='register-card'>
        <h2>Registro</h2>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={logicaregistro} className='form-register'>
          <div className='fila-sector'>
            <div className='sector'>
              <p>Nombre</p>
              <input 
                name='nombre'
                placeholder='Nombre del usuario' 
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div className='sector'>
              <p>Apellido</p>
              <input 
                name='apellido'
                placeholder='Apellido del usuario' 
                type="text"
                value={formData.apellido}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className='fila-sector'>
            <div className='sector'>
              <p>Correo</p>
              <input 
                name='email'
                placeholder='usuario@gmail.com' 
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div className='sector'>
              <p>DNI</p>
              <input 
                name='dni'
                placeholder='12345678' 
                type="text" 
                inputMode='numeric' 
                pattern="[0-9]{8}"
                maxLength="8"
                value={formData.dni}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className='fila-sector'>
            <div className='sector'>
              <p>Dirección</p>
              <input 
                name='direccion'
                placeholder='Calle Lima 333' 
                type="text"
                value={formData.direccion}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div className='sector'>
              <p>Ciudad</p>
              <input 
                name='ciudad'
                placeholder='Arequipa' 
                type="text"
                value={formData.ciudad}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className='fila-sector'>
            <div className='sector'>
              <p>Teléfono</p>
              <input 
                name='telefono'
                placeholder='912345678' 
                type="text"
                inputMode='numeric'
                pattern="[0-9]{9}"
                maxLength="9"
                value={formData.telefono}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div className='sector'></div> {/* Espacio vacío */}
          </div>

          <div className='fila-sector'>
            <div className='sector'>
              <p>Contraseña</p>
              <input 
                name='password'
                placeholder='Contraseña' 
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                minLength="6"
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Mínimo 6 caracteres
              </small>
            </div>
            <div className='sector'>
              <p>Confirmar contraseña</p>
              <input 
                name='confirmPassword'
                placeholder='Confirmar contraseña' 
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className='boton-container'>
            <button 
              type='submit'
              className={`boton-registrar ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Registrarme'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
