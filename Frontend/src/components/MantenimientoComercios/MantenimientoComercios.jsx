import { useState } from "react";
import "./MantenimientoComercios.scss"
import { Link } from "react-router-dom";

function MantenimientoComercios() {
    const [comercios, setComercios] = useState([
        { id: 1, comercio: "La Bisteca" },
        { id: 2, comercio: "Casa Gourmet" },
        { id: 3, comercio: "Bodega del Valle" },
        { id: 4, comercio: "Spa Relax" },
        { id: 5, comercio: "Conciertos Rock" },
        { id: 6, comercio: "Yoga Zen" },
        { id: 7, comercio: "Aventura Montañosa" },
        { id: 8, comercio: "Cine en Casa" },
    ]);

    const handleDelete = (id) => {
        setComercios(comercios.filter(comercio => comercio.id !== id));
    }

    return (
        <div>
            <div className="mantenimiento-experiencias-container">
                <div className="mantenimiento-experiencias">
                    <h2>Listado de comercios</h2>
                    <div className="experiencias-agregar">
                        <div className="search">
                            <input type="text" placeholder="Buscar un comercio..."/>
                            <div className="search-icon">
                                <img src="/assets/Vector.png" alt="" />
                            </div>
                        </div>
                        <div>
                            <button>Buscar</button>
                            <Link className="link-btn-agregar" to="/mant-experiencias">
                                <button className="btn-agregar-exp">Experiencias</button>
                            </Link>
                            <Link className="link-btn-agregar" to="/agregar-comercio">
                                <button className="btn-agregar-exp">Agregar comercio</button>
                            </Link>
                        </div> 
                    </div>

                    <div className="experiencias-table-container">
                        <table className="comercios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Comercio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comercios.map((comercio, index) => (
                                    <tr key={index}>
                                        <td>{comercio.id}</td>
                                        <td>{comercio.comercio}</td>
                                        <td className="acciones-exp">
                                            <Link to={`/editar-comercio/${comercio.id}`}>
                                                <button className="btn-editar-exp">Editar</button>
                                            </Link>
                                            <button onClick={() => handleDelete(comercio.id)} className="btn-eliminar-exp">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MantenimientoComercios;