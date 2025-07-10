import "./MantenimientoExperiencias.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function MantenimientoExperiencias({ }) {
    const [experiencias, setExperiencias] = useState([
        {
            id: 1,
            experiencia: "Cena para 2 en La Bisteca",
            comercio: "La Bisteca",
            costo: 100,
            fecha_expiracion: "05/12/2025",
            usado: false,
            imagen: null,
        },
        {
            id: 2,
            experiencia: "Clase de cocina en Casa Gourmet",
            comercio: "Casa Gourmet",
            costo: 50,
            fecha_expiracion: "15/01/2025",
            usado: false,
            imagen: null,
        },
        {
            id: 3,
            experiencia: "Tour de vinos en Bodega del Valle",
            comercio: "Bodega del Valle",
            costo: 75,
            fecha_expiracion: "20/03/2025",
            usado: true,
            imagen: null,
        },
        {
            id: 4,
            experiencia: "Masaje relajante en Spa Relax",
            comercio: "Spa Relax",
            costo: 60,
            fecha_expiracion: "10/02/2025",
            usado: false,
            imagen: null,
        },
        {
            id: 5,
            experiencia: "Entrada VIP a concierto de Rock",
            comercio: "Conciertos Rock",
            costo: 120,
            fecha_expiracion: "30/04/2025",
            usado: true,
            imagen: null,
        },
        {
            id: 6,
            experiencia: "Clase de yoga al aire libre",
            comercio: "Yoga Zen",
            costo: 30,
            fecha_expiracion: "25/05/2025",
            usado: false,
            imagen: null,
        },
        {
            id: 7,
            experiencia: "Excursión a la montaña con guía",
            comercio: "Aventura Montañosa",
            costo: 80,
            fecha_expiracion: "18/06/2025",
            usado: false,
            imagen: null,
        },
        {
            id: 8,
            experiencia: "Noche de cine en casa con palomitas",
            comercio: "Cine en Casa",
            costo: 20,
            fecha_expiracion: "01/07/2025",
            usado: true,
            imagen: null,
        },
    ]);

    const handleDelete = (id) => {
        setExperiencias(experiencias.filter(exp => exp.id !== id));
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
