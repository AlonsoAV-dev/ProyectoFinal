import TablaProductos from "../TablaProductos/TablaProductos";
import { useEffect } from "react";
import productoApi from "../../api/ProductosApi";

const Productos = ({ lista_productos, setLista_Productos }) => {

    return (
        <>
        <TablaProductos productos={lista_productos} setLista_Productos = {setLista_Productos} />
        </>
    );
};

export default Productos;
