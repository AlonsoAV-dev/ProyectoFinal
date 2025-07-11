import { useEffect, useState } from "react";
import "./MantenimientoComercios.scss"
import { Link } from "react-router-dom";
import comerciosApi from "../../api/comercioApi.js";

function MantenimientoComercios() {
    const [comercios, setComercios] = useState([]);

    useEffect(() => {
        const fetchComercios = async () => {
            const data = await comerciosApi.findAll();
            setComercios(data);
        };
    
        fetchComercios();
    }, []);

    const handleDelete = async (id) => {
        const result = await comerciosApi.remove(id);
        if (result) {
            setComercios(prev => prev.filter(comercio => comercio.id !== id));
        } else {
            alert("Error al eliminar el comercio");
        }
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
                                        <td>{comercio.nombre}</td>
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