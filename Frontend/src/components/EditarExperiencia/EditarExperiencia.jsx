import { useNavigate, useParams } from "react-router-dom";
import "./EditarExperiencia.scss"
import { useEffect, useState } from "react";

function EditarExperiencia() {
    const [experiencias, setExperiencias] = useState([
            {
                id: 1,
                experiencia: "Cena para 2 en La Bisteca",
                comercio: "La Bisteca",
                costo: 100,
                fecha_expiracion: "2025-12-05",
                usado: false,
                imagen: null,
            },
            {
                id: 2,
                experiencia: "Clase de cocina en Casa Gourmet",
                comercio: "Casa Gourmet",
                costo: 50,
                fecha_expiracion: "2025-01-15",
                usado: false,
                imagen: null,
            },
            {
                id: 3,
                experiencia: "Tour de vinos en Bodega del Valle",
                comercio: "Bodega del Valle",
                costo: 75,
                fecha_expiracion: "2025-03-20",
                usado: true,
                imagen: null,
            },
            {
                id: 4,
                experiencia: "Masaje relajante en Spa Relax",
                comercio: "Spa Relax",
                costo: 60,
                fecha_expiracion: "2025-02-10",
                usado: false,
                imagen: null,
            },
            {
                id: 5,
                experiencia: "Entrada VIP a concierto de Rock",
                comercio: "Conciertos Rock",
                costo: 120,
                fecha_expiracion: "2025-04-30",
                usado: true,
                imagen: null,
            },
            {
                id: 6,
                experiencia: "Clase de yoga al aire libre",
                comercio: "Yoga Zen",
                costo: 30,
                fecha_expiracion: "2025-05-25",
                usado: false,
                imagen: null,
            },
            {
                id: 7,
                experiencia: "Excursión a la montaña con guía",
                comercio: "Aventura Montañosa",
                costo: 80,
                fecha_expiracion: "2025-06-18",
                usado: false,
                imagen: null,
            },
            {
                id: 8,
                experiencia: "Noche de cine en casa con palomitas",
                comercio: "Cine en Casa",
                costo: 20,
                fecha_expiracion: "2025-07-01",
                usado: true,
                imagen: null,
            },
        ]);

    const {id} = useParams();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        experiencia: "",
        comercio: "",
        costo: 0,
        fecha_expiracion: "",
        imagen: null,
        usado: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setDataForm({
            ...dataForm,
            imagen: e.target.files[0],  // Guardas el primer archivo seleccionado
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setExperiencias(experiencias.map(exp => 
            exp.id === parseInt(id) ? { ...exp, ...dataForm } : exp
        ));
        navigate("/mant-experiencias"); 
    };
    
    useEffect(()=> {
        const experienciaActual = experiencias.find(exp => exp.id === parseInt(id));
        if (experienciaActual) {
            setDataForm({
                experiencia: experienciaActual.experiencia,
                comercio: experienciaActual.comercio,
                costo: experienciaActual.costo,
                fecha_expiracion: experienciaActual.fecha_expiracion,
                imagen: null,
                usado: experienciaActual.usado
            })
        }
    }, [id, experiencias]);

    return (
        <div className="editar-experiencia">
            <h2>Editar Experiencia</h2>
            <div className="editar-experiencia-container">
                <form className="editar-experiencia-form" onSubmit={handleSubmit}>
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre de la experiencia:</label>
                            <input type="text" id="nombre" name="experiencia" required placeholder="Nombre de la experiencia" value={dataForm.experiencia} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comercio">Comercio:</label>
                            <input type="text" id="comercio" name="comercio" required placeholder="Presentacion" value={dataForm.comercio} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" id="costo" name="costo" required placeholder="Selecciona la categoria del producto" value={dataForm.costo} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha_expiracion">Fecha de expiración:</label>
                            <input type="date" id="fecha_expiracion" name="fecha_expiracion" required value={dataForm.fecha_expiracion} onChange={handleChange}/>
                        </div>
                        <button type="submit">Editar Experiencia</button>
                    </div>
                    <div className="form-image">
                        <div className="file-upload-container">
                            <input type="file" id="imagen" name="imagen" accept="image/*" required onChange={handleImageChange}/>
                            <div>
                                <span className="file-upload-text">Arrastra la imagen a esta zona</span>
                                <p>o</p>
                                <button type="button" className="file-upload-button">Seleccionar imagen</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarExperiencia;