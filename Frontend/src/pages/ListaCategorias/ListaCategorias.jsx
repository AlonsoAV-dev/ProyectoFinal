import { useEffect } from "react";
import "./ListaCategorias.scss"
import edit from '/assets/editar.png';
import borrar from '/assets/delete.png';
import { Link } from "react-router-dom";

function ListaCategorias({categorias, setCategorias}) {

    return (
        <div className="container-main">
            <h2>Listado de categorias</h2>
            <div className="container-tabla">
            <div className="busqueda">
                <input type="text" placeholder="Busca un producto..." >
                </input>
                <div className="botones">
                    <Link to="/agregar-categoria">  
                        <button id="Agregar" className="Agregar">
                            <img src="../../../public/assets/agregar.png"/> Agregar categoria                        
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
                        {
                        categorias.map((categoria) => (
                            <tr className="categorias" key={categoria.id}>
                                <td><span className="id-style">#{categoria.id}</span></td>
                                <td> {categoria.nombre}</td>
                                <td> {categoria.descripcion}</td>
                                <td className="td-acciones">
                                    <div className="acciones-iconos">                                                    
                                        <Link to={`/editar/${categoria.id}`}>
                                            <img src={edit} className="btn-editar" alt="Botón" />
                                        </Link>
                                        <img src={borrar} className="btn-borrar" id="btn-borrar"
                                        onClick={() => MostrarAlerta({ nombre: categoria.nombre, id: categoria.id, productos:productos, setProductos:setLista_Productos })}
                                        alt="Botón" />                       
                                    </div>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>  
            </div>
            <div className="paginacion">
                <button className="anterior">1</button>
                <button className="siguiente">2</button>    
            </div> 
            </div>
        </div>
    )
}

export default ListaCategorias;