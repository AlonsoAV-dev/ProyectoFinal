import './App.css'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import apis from './api/ProductosApi'
import { getUsuario, updateUsuario } from './api/usuarioData'
import { useState, useEffect } from 'react'
import AgregarProducto from './pages/AgregarProducto/AgregarProducto'
import EditarProducto from './pages/EditarProducto/EditarProducto'
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin'
import CarroCompras from './pages/CarroCompras/CarroCompras'
import TablaProductos from './components/TablaProductos/TablaProductos'
import AgregarCategoria from './pages/AgregarCategoria/AgregarCategoria'
import ViewProducts from './pages/ViewProducts/ViewProducts'
import Register from './pages/Register/Register'
import Password from './pages/Password/Password'
import DetalleOrd from './pages/DetalleOrd/DetalleOrd'
import DetalleUs from './pages/DetalleUs/DetalleUs'
import ListaUs from './pages/ListaUs/ListaUs'
import Inicio from './pages/Inicio/Inicio'
import DetalleP from './pages/DetalleP/DetalleP'
import Experiencias from './pages/Experiencias/Experiencias'
import MantenimientoExperiencias from './components/MantenimientoExperiencias/MantenimientoExperiencias'
import AgregarExperiencia from './components/AgregarExperiencia/AgregarExperiencia'
import EditarExperiencia from './components/EditarExperiencia/EditarExperiencia'
import MantenimientoComercios from './components/MantenimientoComercios/MantenimientoComercios'
import AgregarComercio from './components/AgregarComercio/AgregarComercio'
import EditarComercio from './components/EditarComercio/EditarComercio'
import ListaCategorias from './pages/ListaCategorias/ListaCategorias'
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal'
import DatosUsuario from './pages/DatosUsuario/DatosUsuario'
import CambiarPassword from './pages/CambiarPassword/CambiarPassword'

import Checkout from './pages/Checkout/Checkout'
import DetalleProducto from './pages/DetalleProducto/DetalleProducto'
import MetodoPago from './pages/MetodoPago/MetodoPago'
import PagoQR from './pages/PagoQR/PagoQR'
import SelectorMetodoPago from './components/SelectorMetodoPago/SelectorMetodoPago'
import PagoTarjeta from './pages/PagoTarjeta/PagoTarjeta'
import OrdenCompletada from './pages/OrdenCompletada/OrdenCompletada'
import Categorias from './pages/Categorias/Categorias'
import ListaOrd from './pages/ListaOrd/ListaOrd'

function App() {
  
  const productosApi= apis.productoApi;

  const [lista_productos, setLista_Productos] = useState(() => {
    return productosApi.obtenerProductos();
  });

  const [lista_categorias, setListaCategorias] = useState(() => {
    return productosApi.obtenerCategorias();
  })

  const [usuarioActual, setUsuarioActual] = useState(() => getUsuario());

  const handleUpdateUsuario = (datosNuevosDelFormulario) => {
    const usuarioActualizadoDesdeApi = updateUsuario(datosNuevosDelFormulario);
    setUsuarioActual(usuarioActualizadoDesdeApi);
  };

  useEffect(() => {
    productosApi.guardarProductos(lista_productos);
  }, [lista_productos]);

    return (
    <>
      <BrowserRouter>
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/productos" element={<TablaProductos/>} />
          <Route path="/agregar" element={<AgregarProducto  />} />
          <Route path="/editar/:id" element={<EditarProducto />} />
          <Route path="/carrito" element={<CarroCompras lista_productos={lista_productos} setLista_Productos={setLista_Productos}/>}/>
          <Route path="/agregar-categoria" element={<AgregarCategoria categorias={lista_categorias} setCategorias={setListaCategorias}/>}/>
          <Route path="/Detalle-producto-admin/:id" element={<DetalleProducto />}/>
          <Route path="/dashboard" element={<DashboardAdmin/>} />
          <Route path="/registro" element={<Register />} />
          <Route path="/olvide-contraseña" element={<Password />} />
          <Route path="/orden/:idOrden" element={<DetalleOrd />} />
          <Route path="/detail-user" element={<DetalleUs />} />
          <Route path="/list-users" element={<ListaUs />} />
          <Route path="/detail-product" element={<DetalleP />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/mant-experiencias" element={<MantenimientoExperiencias />} />
          <Route path="/agregar-experiencia" element={<AgregarExperiencia />} />
          <Route path="/editar-experiencia/:id" element={<EditarExperiencia />} />
          <Route path="/mant-comercios" element={<MantenimientoComercios />} />
          <Route path="/agregar-comercio" element={<AgregarComercio />} />
          <Route path="/editar-comercio/:id" element={<EditarComercio />} />
          <Route path="/lista-categorias" element={<ListaCategorias categorias={lista_categorias} setCategorias={setListaCategorias}/>} />
          <Route path="/pagina-principal" element={<PaginaPrincipal usuario={usuarioActual} />} />
          <Route path="/mis-datos" element={<DatosUsuario usuarioOriginal={usuarioActual} onGuardarCambios={handleUpdateUsuario} />} />
          <Route path="/cambiar-contrasena" element={<CambiarPassword />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/metodoPago" element={<MetodoPago />}>
          <Route index element={<SelectorMetodoPago />} />
          <Route path="qr" element={<PagoQR />} />
          <Route path="tarjeta" element={<PagoTarjeta />} />
          </Route>
          <Route path="/OrdenCompletada" element={<OrdenCompletada/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
