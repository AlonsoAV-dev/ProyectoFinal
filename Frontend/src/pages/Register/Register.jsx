import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

function Register() {
  const navigate = useNavigate();

  const nombreRef = useRef();
  const apellidoRef = useRef();
  const correoRef = useRef();
  const dniRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const logicaregistro = () => {
    const nombre = nombreRef.current.value.trim();
    const apellido = apellidoRef.current.value.trim();
    const correo = correoRef.current.value.trim();
    const dni = dniRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (nombre==="" && apellido==="" && correo==="" && dni==="" && password==="" && confirmPassword==="") {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    navigate('/pagina-principal');
  };

  return (
    <div className='register'>
      <div className='register-card'>
        <h2>Registro</h2>

        <div className='fila-sector'>
          <div className='sector'>
            <p>Nombre</p>
            <input ref={nombreRef} placeholder='Nombre del usuario' type="text" />
          </div>
          <div className='sector'>
            <p>Apellido</p>
            <input ref={apellidoRef} placeholder='Apellido del usuario' type="text" />
          </div>
          <div className='sector'>
            <p>Correo</p>
            <input ref={correoRef} placeholder='usuario@gmail.com' type="text" />
          </div>
          <div className='sector'>
            <p>DNI</p>
            <input ref={dniRef} placeholder='DNI' type="text" inputMode='numeric' pattern="[0-9]{8}" />
          </div>
          <div className='sector'>
            <p>Contraseña</p>
            <input ref={passwordRef} placeholder='Contraseña' type="password" />
          </div>
          <div className='sector'>
            <p>Confirmar contraseña</p>
            <input ref={confirmPasswordRef} placeholder='Contraseña' type="password" />
          </div>
        </div>

        <button className='boton-registrar' onClick={logicaregistro}>Registrarme</button>
      </div>
    </div>
  );
}

export default Register;
