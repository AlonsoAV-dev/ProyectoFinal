import "./ExperienciasLayout.scss";

import imgBisteca from "../../assets/img-oferta-labisteca.avif";

function ExperienciasLayout() {

    const lista_experiencias = [
        {
            experiencia: "Cena para 2 en La Bisteca",
            comercio: "La Bisteca",
            costo: 100,
            fecha_expiracion: "05/12/2025",
            usado: false,
        },
        {
            experiencia: "Clase de cocina en Casa Gourmet",
            comercio: "Casa Gourmet",
            costo: 50,
            fecha_expiracion: "15/01/2025",
            usado: false,
        },
        {
            experiencia: "Tour de vinos en Bodega del Valle",
            comercio: "Bodega del Valle",
            costo: 75,
            fecha_expiracion: "20/03/2025",
            usado: true,
        },
        {
            experiencia: "Masaje relajante en Spa Relax",
            comercio: "Spa Relax",
            costo: 60,
            fecha_expiracion: "10/02/2025",
            usado: false,
        },
        {
            experiencia: "Entrada VIP a concierto de Rock",
            comercio: "Conciertos Rock",
            costo: 120,
            fecha_expiracion: "30/04/2025",
            usado: true,
        },
        {
            experiencia: "Clase de yoga al aire libre",
            comercio: "Yoga Zen",
            costo: 30,
            fecha_expiracion: "25/05/2025",
            usado: false,
        },
        {
            experiencia: "Excursión a la montaña con guía",
            comercio: "Aventura Montañosa",
            costo: 80,
            fecha_expiracion: "18/06/2025",
            usado: false,
        },
        {
            experiencia: "Noche de cine en casa con palomitas",
            comercio: "Cine en Casa",
            costo: 20,
            fecha_expiracion: "01/07/2025",
            usado: true,
        },
    ]

    return (
        <div className="experiencias-layout">
            <div className="experiencias-container">
                {lista_experiencias.map((exp, index) => (
                    <div key={index} className="experiencia-card">
                        <h2 className="experiencia-nombre">{exp.experiencia}</h2>
                        <img src={imgBisteca} alt="" />
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