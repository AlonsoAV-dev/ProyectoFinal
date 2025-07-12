import { useNavigate } from "react-router-dom";
import "./BotonesAdmin.scss"; // si tienes estilos

const BotonesAdmin = ({ mode }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (mode) {
      case "Ver todos los usuarios":
        navigate("/list-users");
        break;
      case "Ver ordenes":
        navigate("/lista-ordenes");
        break;
      case "Ver productos":
        navigate("/productos");
        break;
      default:
        console.warn("Modo no reconocido:", mode);
        break;
    }
  };

    return (
        <div className="verUsuarios" onClick={handleClick}>
            <img src="/assets/hamburguer.png" alt="" />
            <p>
                {mode}
            </p>
        </div>
    );
};

export default BotonesAdmin;

