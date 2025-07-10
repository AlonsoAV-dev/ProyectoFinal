import FormProduct from "../../components/FormularioProductos/FormProduct/FormProduct";
import "./AgregarCategoria.scss"

const AgregarCategoria = ({categorias, setCategorias}) => {
  
  return (
    <div className="agregar-experiencia">
        <h2>Agregar Categoria</h2>
        <div className="agregar-experiencia-container">
            <form className="agregar-experiencia-form">
                <div className="form-info">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre de la categoria:</label>
                        <input type="text" id="nombre" name="nombre" required placeholder="Nombre de la categoria"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comercio">Descripcion:</label>
                        <input type="text" id="comercio" name="comercio" required placeholder="Descripcion"/>
                    </div>
                    <button type="submit">Agregar Categoria</button>
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
};

export default AgregarCategoria;