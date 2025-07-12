import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarCategoria.scss"
import categoriaApi from "../../api/categoriaApi";

const EditarCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "Activo",
    imagen: null
  });
  const [cargando, setCargando] = useState(true);

  // Cargar datos de la categoría
  useEffect(() => {
    const cargarCategoria = async () => {
      try {
        const categoriaData = await categoriaApi.obtenerCategoriaPorId(id);
        setCategoria(categoriaData);
        setFormData({
          nombre: categoriaData.nombre || "",
          descripcion: categoriaData.descripcion || "",
          estado: categoriaData.estado || "Activo",
          imagen: null
        });
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar categoría:", error);
        alert("Error al cargar la categoría");
        navigate("/lista-categorias");
      }
    };

    cargarCategoria();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      imagen: e.target.files[0]
    }));
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault();
    
    try {
      const categoriaActualizada = {
        id: parseInt(id),
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        estado: formData.estado,
        imagen: formData.imagen ? formData.imagen.name : categoria.imagen
      };
      
      await categoriaApi.actualizarCategoria(categoriaActualizada);
      
      alert("Categoría actualizada exitosamente");
      navigate("/lista-categorias");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Error al actualizar la categoría");
    }
  };

  if (cargando) {
    return (
      <div className="agregar-experiencia">
        <h2>Cargando categoría...</h2>
      </div>
    );
  }

  return (
    <div className="agregar-experiencia">
      <h2>Editar Categoría</h2>
      <div className="agregar-experiencia-container">
        <form className="agregar-experiencia-form" onSubmit={manejarEnvioFormulario}>
          <div className="form-info">
            <div className="form-group">
              <label htmlFor="nombre">Nombre de la categoría:</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                required 
                placeholder="Nombre de la categoría"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input 
                type="text" 
                id="descripcion" 
                name="descripcion" 
                required 
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <select 
                id="estado" 
                name="estado" 
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <button type="submit">Actualizar Categoría</button>
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
                <span className="file-upload-text">
                  {categoria.imagen ? `Imagen actual: ${categoria.imagen}` : "Arrastra la imagen a esta zona"}
                </span>
                <p>o</p>
                <button type="button" className="file-upload-button">
                  {categoria.imagen ? "Cambiar imagen" : "Seleccionar imagen"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCategoria; 