import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Login() {
  const navigate = useNavigate();
  const correoRef = useRef();
  const passwordRef = useRef();

  const logicalogin = () => {
    const correo = correoRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (correo === "" && password==="") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const correoValido = "andrewhuancaya@gmail.com";
    const passwordValida = "andrew30";

    if (correo === correoValido && password === passwordValida) {
      navigate("/pagina-principal");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <div className="correo">
          <p>Correo</p>
          <input ref={correoRef} type="text" placeholder="usuario@gmail.com" />
        </div>

        <div className="password">
          <p>Contraseña</p>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Contraseña"
          />
        </div>

        <button className="bot Iniciar Sesion" onClick={logicalogin}>
          Iniciar sesión
        </button>

        <div className="enlaces">
          <Link to="/registro" className="registro">
            Registrarme
          </Link>
          <Link to="/olvide-contraseña" className="olvide-contraseña">
            Olvidé mi contraseña
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
