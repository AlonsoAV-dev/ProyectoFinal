import { useEffect, useState } from "react";
import "./ListaCategorias.scss"
import edit from '/assets/editar.png';
import borrar from '/assets/delete.png';
import { Link } from "react-router-dom";
import categoriaApi from "../../api/categoriaApi";
import Swal from 'sweetalert2';

function ListaCategorias({categorias, setCategorias}) {
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [categoriasPorPagina] = useState(5); // 5 categorías por página

    // Función para mostrar alerta de eliminación específica para categorías
    const mostrarAlertaEliminar = ({ nombre, id }) => {
        Swal.fire({
            html: `
            <h2 id="eliminar-categoria">Eliminar categoría</h2>
            <div class="contenedor-alerta">
                <div class="icono-x">✖</div>
                <div class="alerta-horizontal">           
                    <div class="contenido-texto">
                    <p>¿Estás seguro que deseas eliminar la categoría "<b>${nombre}</b>" ?</p>
                        </div>
                </div>
            </div>
            `,
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, eliminar",
            confirmButtonColor: "#FE624C",
            denyButtonColor: "#D9D9D9",
            width: "800px",
            heightAuto: false,
            customClass: {
                popup: "popup-custom",
                confirmButton: "btn-eliminar",
                denyButton: "btn-eliminar-2"
            },
        }).then(async response => {
            if(response.isConfirmed){
                try {
                    await categoriaApi.eliminarCategoria(id);
                    // Recargar categorías después de eliminar
                    const categoriasActualizadas = await categoriaApi.obtenerCategorias();
                    setCategorias(categoriasActualizadas);
                    
                    Swal.fire({
                        title: "Éxito",
                        icon: 'success',
                        text: 'La categoría fue eliminada exitosamente.',
                        confirmButtonColor: "#FE624C",
                    });
                } catch (error) {
                    console.error('Error al eliminar categoría:', error);
                    Swal.fire({
                        title: "Error",
                        icon: 'error',
                        text: 'No se pudo eliminar la categoría.',
                        confirmButtonColor: "#FE624C",
                    });
                }
            }
        });
    };

    // Filtrar categorías por búsqueda
    const categoriasFiltradas = categorias.filter(categoria =>
        categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        categoria.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Cálculos para paginación
    const totalPaginas = Math.ceil(categoriasFiltradas.length / categoriasPorPagina);
    const indiceInicio = (paginaActual - 1) * categoriasPorPagina;
    const indiceFin = indiceInicio + categoriasPorPagina;
    const categoriasVisibles = categoriasFiltradas.slice(indiceInicio, indiceFin);

    // Funciones de paginación
    const irAPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    // Resetear a página 1 cuando se busca
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    return (
        <div className="container-main lista-categorias-container">
            <div className="agregar-experiencia">
                <h2>Listado de categorías</h2>
            <div className="container-tabla">
            <div className="busqueda">
                <input 
                    type="text" 
                    placeholder="Busca una categoría..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <div className="botones">
                    <Link to="/agregar-categoria">  
                        <button id="Agregar" className="Agregar">
                            <img src="../../../public/assets/agregar.png"/> Agregar categoría                        
                        </button>
                    </Link>
                </div>
            </div>
            <div className="lista-categoria">
                <table className="tabla-categorias">
                    <thead>
                        <tr className="titulo">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th className="th-acciones">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {categoriasVisibles.length > 0 ? (
                            categoriasVisibles.map((categoria) => (
                                <tr className="categorias" key={categoria.id}>
                                    <td><span className="id-style">#{categoria.id}</span></td>
                                    <td>{categoria.nombre}</td>
                                    <td>{categoria.descripcion}</td>
                                    <td className="td-acciones">
                                        <div className="acciones-iconos">                                                    
                                            <Link to={`/editar-categoria/${categoria.id}`}>
                                                <img src={edit} className="btn-editar" alt="Editar categoría" />
                                            </Link>
                                            <img 
                                                src={borrar} 
                                                className="btn-borrar" 
                                                id="btn-borrar"
                                                onClick={() => mostrarAlertaEliminar({ nombre: categoria.nombre, id: categoria.id })}
                                                alt="Eliminar categoría" 
                                            />                       
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>
                                    {busqueda ? 'No se encontraron categorías que coincidan con la búsqueda.' : 'No hay categorías disponibles.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>  
            </div>
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button 
                        className={`anterior ${paginaActual === 1 ? 'disabled' : ''}`}
                        onClick={irAPaginaAnterior}
                        disabled={paginaActual === 1}
                    >
                        {paginaActual - 1 || 1}
                    </button>
                    <span className="info-pagina">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                    <button 
                        className={`siguiente ${paginaActual === totalPaginas ? 'disabled' : ''}`}
                        onClick={irAPaginaSiguiente}
                        disabled={paginaActual === totalPaginas}
                    >
                        {paginaActual + 1 > totalPaginas ? totalPaginas : paginaActual + 1}
                    </button>
                </div> 
            )}
            </div>
            </div>
        </div>
    )
}

export default ListaCategorias;