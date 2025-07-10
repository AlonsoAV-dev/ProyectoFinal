import "./AgregarComercio.scss";

function AgregarComercio() {

    return (
        <div className="agregar-comercio">
            <h2>Agregar Comercio</h2>
            <div className="agregar-comercio-container">
                <form className="agregar-comercio-form">
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del comercio:</label>
                            <input type="text" id="nombre" name="nombre" required placeholder="Nombre del comercio"/>
                        </div>
                        <button type="submit">Agregar Comercio</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AgregarComercio;