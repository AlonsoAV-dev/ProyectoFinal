import "./Header.scss"
import { Link } from "react-router-dom";
import carritoApi from "../../api/carritoApi.js";
function Header() {
    const usuarioId = 1; // Cambia esto según tu lógica de usuario
    


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
                <Link to='/login'>
                    <div className="user-info">
                        <img src="/assets/user.png" alt=""  className="icon-user"/>
                        <div>
                            <p className="p-user">User</p>
                            <p className="p-cuenta">cuenta</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;