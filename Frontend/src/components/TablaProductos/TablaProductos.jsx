import "./tablaProductos.scss" 
import edit from '/assets/editar.png';
import borrar from '/assets/delete.png';
import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import {MostrarAlerta} from "./MostrarAlerta"
const TablaProductos = ({productos, setLista_Productos}) => {
    
    const [filtroProductos , setFiltroProductos] = useState(productos);
    const [busqueda, setBusqueda] = useState('');
    useEffect(() => {
        setFiltroProductos(productos);
    }, [productos]);

    const filtrarProductos = () =>{
        const resultado = productos.filter((producto) => producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda.toLowerCase()));
        setFiltroProductos(resultado);
    }
    useEffect(() => {
        if(busqueda === ''){
            setFiltroProductos(productos);
        }
    },[busqueda]);


    return (
    <div className="container-main">
        <h2>Listado de productos</h2>
        <div className="container-tabla">
        <div className="busqueda">
            <input type="text" value={busqueda} onChange={(e)=> setBusqueda(e.target.value)}
             placeholder="Busca un producto..." >
            </input>
            <div className="botones">
                <button id="Buscar" onClick={()=> filtrarProductos()} className="Buscar">Buscar</button>
                <button id="Categorias" className="Categorias" >
                    <img src="../../../public/assets/hamburguer.png"/>
                    <p>Categorias</p>
                </button>
                <Link to="/agregar">  
                    <button id="Agregar" className="Agregar">
                        <img src="../../../public/assets/agregar.png"/> Agregar producto                        
                    </button>
                </Link>
            </div>
        </div>
        <div className="lista-producto">
            <table className="tabla-productos">
                <thead>
                    <tr className="titulo">
                        <th> </th>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Presentación</th>
                        <th>Descripción</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {
                    filtroProductos.map((producto) => (
                        <tr className="productos">
                            <td>
                                <Link to={`/detalle-producto-admin/${producto.id}`}>
                                    <img src={producto.img}
                                        alt={producto.nombre}/>
                                </Link>
                            </td>
                            <td><span className="id-style">#{producto.id}</span></td>
                            <td> {producto.nombre}</td>
                            <td> {producto.presentacion}</td>
                            <td> {producto.descripcion}</td>
                            <td><b>{producto.categoria}</b></td>
                            <td>{producto.stock}</td>
                            <td>
                                <div className="acciones-iconos">                                                    
                                    <Link to={`/editar/${producto.id}`}>
                                        <img src={edit} className="btn-editar" alt="Botón" />
                                    </Link>
                                    <img src={borrar} className="btn-borrar" id="btn-borrar"
                                    onClick={() => MostrarAlerta({ nombre: producto.nombre, id: producto.id, productos:productos, setProductos:setLista_Productos })}
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
    );
};

export default TablaProductos;