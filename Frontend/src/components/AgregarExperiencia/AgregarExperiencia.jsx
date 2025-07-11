import "./AgregarExperiencia.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import experienciasApi from "../../api/experienciaApi";
import comerciosApi from "../../api/comercioApi";

function AgregarExperiencia() {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        experiencia: "",
        comercio: "",
        costo: "",
        fecha_expiracion: "",
        imagen: ""
    });

    const [comercios, setComercios] = useState([]);
    const [imagenPreview, setImagenPreview] = useState(null);

    useEffect(() => {
        const fetchComercios = async () => {
            const data = await comerciosApi.findAll();
            setComercios(data);
        };
        fetchComercios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagenPreview(url);
            setDataForm({
                ...dataForm,
                imagen: url, // solo vista previa; si usas backend real, sería File
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await experienciasApi.create(dataForm);
        navigate("/mant-experiencias");
    };

    return (
        <div className="agregar-experiencia">
            <h2>Agregar Experiencia</h2>
            <div className="agregar-experiencia-container">
                <form className="agregar-experiencia-form" onSubmit={handleSubmit}>
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="experiencia">Nombre de la experiencia:</label>
                            <input
                                type="text"
                                id="experiencia"
                                name="experiencia"
                                required
                                value={dataForm.experiencia}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="comercio">Comercio:</label>
                            <select
                                id="comercio"
                                name="comercio"
                                value={dataForm.comercio}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un comercio</option>
                                {comercios.map((c) => (
                                    <option key={c.id} value={c.nombre}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input
                                type="number"
                                id="costo"
                                name="costo"
                                required
                                value={dataForm.costo}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha_expiracion">Fecha de expiración:</label>
                            <input
                                type="date"
                                id="fecha_expiracion"
                                name="fecha_expiracion"
                                required
                                value={dataForm.fecha_expiracion}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Agregar Experiencia</button>
                    </div>

                    <div className="form-image">
                        <div className="file-upload-container">
                            <input
                                type="file"
                                id="imagen"
                                name="imagen"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div>
                                <span className="file-upload-text">Arrastra la imagen a esta zona</span>
                                <p>o</p>
                                <label htmlFor="imagen" className="file-upload-button">Seleccionar imagen</label>
                            </div>
                            {imagenPreview && (
                                <div className="preview-img">
                                    <img src={imagenPreview} alt="Vista previa" />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgregarExperiencia;
