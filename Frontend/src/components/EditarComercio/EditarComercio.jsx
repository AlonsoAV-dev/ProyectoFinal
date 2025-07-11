import { useNavigate, useParams } from "react-router-dom";
import "./EditarComercio.scss"
import { useEffect, useState } from "react";
import comerciosApi from "../../api/comercioApi.js";

function EditarComercio() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        comercio: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const result = await comerciosApi.update(dataForm);
    
        if (result) {
            alert("Comercio actualizado correctamente");
            navigate("/mant-comercios");
        } else {
            alert("Error al actualizar comercio");
        }
    };

    useEffect(() => {
        const fetchComercio = async () => {
            const comercio = await comerciosApi.findOne(id);
            if (comercio) {
                setDataForm({
                    id: comercio.id,
                    nombre: comercio.nombre, 
                });
            } else {
                alert("Comercio no encontrado");
            }
        };
    
        fetchComercio();
    }, [id]);

    return (
        <div>
            <div className="editar-comercio">
                <h2>Editar Comercio</h2>
                <div className="editar-comercio-container">
                    <form className="editar-comercio-form" onSubmit={handleSubmit}>
                        <div className="form-info">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del comercio:</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    required
                                    placeholder="Nombre del comercio"
                                    value={dataForm.nombre}
                                    onChange={handleChange}
                                />
                                <button type="submit">Editar Experiencia</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarComercio;