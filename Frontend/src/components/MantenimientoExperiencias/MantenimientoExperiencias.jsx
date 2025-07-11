import "./MantenimientoExperiencias.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import experienciasApi from "../../api/experienciaApi.js";

function MantenimientoExperiencias({ }) {
    const [experiencias, setExperiencias] = useState([]);

    useEffect(() => {
        const fetchExperiencias = async () => {
            const data = await experienciasApi.findAll();
            setExperiencias(data);
        };
        fetchExperiencias();
    }, []);

    const handleDelete = async (id) => {
        await experienciasApi.remove(id);
        const data = await experienciasApi.findAll();
        setExperiencias(data);
    }

    return (
        <div className="mantenimiento-experiencias-container">
            <div className="mantenimiento-experiencias">
                <h2>Listado de experiencias</h2>
                <div className="experiencias-agregar">
                    <div className="search">
                        <input type="text" placeholder="Buscar una experiencia..."/>
                        <div className="search-icon">
                            <img src="/assets/Vector.png" alt="" />
                        </div>
                    </div>
                    <div>
                        <button>Buscar</button>
                        <Link className="link-btn" to="/mant-comercios">
                            <button className="btn-exp">Comercios</button>
                        </Link>
                        <Link className="link-btn-agregar" to="/agregar-experiencia">
                            <button className="btn-exp">Agregar experiencia</button>
                        </Link>
                    </div> 
                </div>

                <div className="experiencias-table-container">
                    <table className="experiencias-table">
                        <thead>
                            <tr>
                                <th>Experiencia</th>
                                <th>Comercio</th>
                                <th>Costo</th>
                                <th>Fecha de expiración</th>
                                <th>Usado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiencias.map((exp, index) => (
                                <tr key={index}>
                                    <td>{exp.experiencia}</td>
                                    <td>{exp.comercio}</td>
                                    <td>${exp.costo}</td>
                                    <td>{exp.fecha_expiracion}</td>
                                    <td>{exp.usado ? "Sí" : "No"}</td>
                                    <td className="acciones-exp">
                                        <Link to={`/editar-experiencia/${exp.id}`}>
                                            <button className="btn-editar-exp">Editar</button>
                                        </Link>
                                        <button onClick={() => handleDelete(exp.id)} className="btn-eliminar-exp">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MantenimientoExperiencias;
