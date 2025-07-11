import { useNavigate, useParams } from "react-router-dom";
import "./EditarExperiencia.scss";
import { useEffect, useState } from "react";
import experienciaApi from "../../api/experienciaApi";
import comercioApi from "../../api/comercioApi";

function EditarExperiencia() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        experiencia: "",
        comercio: "",
        costo: 0,
        fecha_expiracion: "",
        imagen: "",
        usado: false,
    });

    const [comercios, setComercios] = useState([]);
    const [previewImg, setPreviewImg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const experiencia = await experienciaApi.findOne(id);
            const comerciosBD = await comercioApi.findAll();

            setDataForm(experiencia);
            setComercios(comerciosBD);
            setPreviewImg(experiencia.imagen);
        };

        fetchData();
    }, [id]);

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
            setDataForm({ ...dataForm, imagen: url });
            setPreviewImg(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await experienciaApi.update({ ...dataForm, id });
        navigate("/mant-experiencias");
    };

    return (
        <div className="editar-experiencia">
            <h2>Editar Experiencia</h2>
            <div className="editar-experiencia-container">
                <form className="editar-experiencia-form" onSubmit={handleSubmit}>
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="experiencia">Nombre de la experiencia:</label>
                            <input
                                type="text"
                                id="experiencia"
                                name="experiencia"
                                value={dataForm.experiencia}
                                onChange={handleChange}
                                required
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
                                value={dataForm.costo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha_expiracion">Fecha de expiración:</label>
                            <input
                                type="date"
                                id="fecha_expiracion"
                                name="fecha_expiracion"
                                value={dataForm.fecha_expiracion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="usado">¿Usado?</label>
                            <select
                                id="usado"
                                name="usado"
                                value={dataForm.usado ? "true" : "false"}
                                onChange={(e) =>
                                    setDataForm({ ...dataForm, usado: e.target.value === "true" })
                                }
                                required
                            >
                                <option value="false">No</option>
                                <option value="true">Sí</option>
                            </select>
                        </div>

                        <button type="submit">Guardar Cambios</button>
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
                                <button type="button" className="file-upload-button">
                                    Seleccionar imagen
                                </button>
                                {previewImg && (
                                    <div style={{ marginTop: "10px" }}>
                                        <img src={previewImg} alt="preview" style={{ width: "200px" }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarExperiencia;
