import { Link } from "react-router-dom";
import "./Navbar.scss"

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <ul>
                    <li>
                        <Link to="/lista-categorias" className="navbar-link">
                            <img src="/assets/hamburguer.png" alt="" />Categorias
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="navbar-link">Productos</Link>
                    </li>
                    <li>
                        <Link to="#" className="navbar-link">Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <Link to="/experiencias">
                    OFERTAS 👋
                </Link>
            </div>
        </div>
    )
}

export default Navbar;