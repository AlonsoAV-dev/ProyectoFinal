import "./ExperienciasLayout.scss";

import experienciasApi from "../../api/experienciaApi.js";
import { useState, useEffect } from "react";

function ExperienciasLayout() {

    const [experiencias, setExperiencias] = useState([]);

    useEffect(() => {
        const fetchExperiencias = async () => {
            const data = await experienciasApi.findAll();
            setExperiencias(data);
        };
    
        fetchExperiencias();
    }, []);
    

    return (
        <div className="experiencias-layout">
            <div className="experiencias-container">
                {experiencias.map((exp, index) => (
                    <div key={index} className="experiencia-card">
                        <h2 className="experiencia-nombre">{exp.experiencia}</h2>
                        <img src={exp.imagen} alt="" />
                        <p className="experiencia-comercio">{exp.comercio}</p>
                        <p className="experiencia-costo">${exp.costo}</p>
                        <p><strong>Fecha de expiración:</strong> {exp.fecha_expiracion}</p>
                        <p className="disp"><strong className="disponibilidad">{exp.usado ? "Disponible" : "Usado"}</strong></p>
                        <button className="agregar-btn">Agregar</button>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ExperienciasLayout;