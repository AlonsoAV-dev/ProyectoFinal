import { useNavigate, useParams } from "react-router-dom";
import "./EditarComercio.scss"
import { useEffect, useState } from "react";

function EditarComercio() {
    const [comercios, setComercios] = useState([
            { id: 1, comercio: "La Bisteca" },
            { id: 2, comercio: "Casa Gourmet" },
            { id: 3, comercio: "Bodega del Valle" },
            { id: 4, comercio: "Spa Relax" },
            { id: 5, comercio: "Conciertos Rock" },
            { id: 6, comercio: "Yoga Zen" },
            { id: 7, comercio: "Aventura Montañosa" },
            { id: 8, comercio: "Cine en Casa" },
    ]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setComercios(comercios.map(comercio => 
            comercio.id === parseInt(id) ? { ...comercio, ...dataForm } : comercio
        ));
        navigate("/mant-experiencias"); 
    };

    useEffect(()=> {
            const comercioActual = comercios.find(exp => exp.id === parseInt(id));
            if (comercioActual) {
                setDataForm({
                    comercio: comercioActual.comercio,
                })
            }
    }, [id, comercios]);

    return (
        <div>
            <div className="editar-comercio">
                <h2>Editar Comercio</h2>
                <div className="editar-comercio-container">
                    <form className="editar-comercio-form" onSubmit={handleSubmit}>
                        <div className="form-info">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del comercio:</label>
                                <input type="text" id="nombre" name="experiencia" required placeholder="Nombre de la experiencia" value={dataForm.comercio} onChange={handleChange}/>
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