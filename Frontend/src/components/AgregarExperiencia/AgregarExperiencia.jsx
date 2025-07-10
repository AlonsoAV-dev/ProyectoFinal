import "./AgregarExperiencia.scss"

function AgregarExperiencia() {
    return (
        <div className="agregar-experiencia">
            <h2>Agregar Experiencia</h2>
            <div className="agregar-experiencia-container">
                <form className="agregar-experiencia-form">
                    <div className="form-info">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre de la experiencia:</label>
                            <input type="text" id="nombre" name="nombre" required placeholder="Nombre de la experiencia"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comercio">Comercio:</label>
                            <input type="text" id="comercio" name="comercio" required placeholder="Presentacion"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" id="costo" name="costo" required placeholder="Selecciona la categoria del producto"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha-expiracion">Fecha de expiración:</label>
                            <input type="date" id="fecha-expiracion" name="fecha-expiracion" required />
                        </div>
                        <button type="submit">Agregar Experiencia</button>
                    </div>
                    <div className="form-image">
                        <div className="file-upload-container">
                            <input type="file" id="imagen" name="imagen" accept="image/*" required />
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

export default AgregarExperiencia;