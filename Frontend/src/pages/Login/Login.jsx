import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import usuarioApi from "../../api/usuarioApi";

function Login({ onActualizarUsuario }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logicalogin = async (e) => {
    e.preventDefault();
    
    if (!correo.trim() || !password.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Intentar login con API real
      const usuario = await usuarioApi.login(correo, password);
      
      // Actualizar usuario usando la función del padre (App.jsx)
      if (onActualizarUsuario) {
        onActualizarUsuario(usuario);
      }
      
      // Navegar a página principal
      navigate("/pagina-principal");
      
    } catch (error) {
      console.error('Error en login:', error);
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <div className="correo">
          <p>Correo</p>
          <input 
            type="email" 
            placeholder="usuario@gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="password">
          <p>Contraseña</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          onClick={logicalogin}
          className="bot-Iniciar-Sesion"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}

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
