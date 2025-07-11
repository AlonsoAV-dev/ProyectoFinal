import "./AgregarComercio.scss";
import comercioApi from "../../api/comercioApi.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgregarComercio() {

    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nuevoComercio = {
            nombre: nombre.trim()
        };
    
        const result = await comercioApi.create(nuevoComercio);
    
        if (result) {
            alert("Comercio agregado correctamente");
            navigate("/mant-comercios");
        } else {
            alert("Error al agregar comercio");
        }
    };

    return (
        <div className="agregar-comercio">
            <h2>Agregar Comercio</h2>
            <div className="agregar-comercio-container">
                <form className="agregar-comercio-form" onSubmit={handleSubmit}>
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del comercio:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                placeholder="Nombre del comercio"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <button type="submit">Agregar Comercio</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AgregarComercio;