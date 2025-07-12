import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productosRouter from './routes/productos.js';
import usersRouter from './routes/users.js';
import comerciosRouter from './routes/comercios.js';
import experienciasRouter from './routes/experiencias.js';

import ordenRouter from './routes/orden.js';
import carritoRouter from './routes/carrito.js';
import itemCarritoRouter from './routes/itemCarrito.js';
import categoriasRouter from './routes/categorias.js';
import itemOrden from './routes/itemOrden.js';

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) =>  {
    return res.json({message: "hellow world"})
})

app.use('/productos', productosRouter);
app.use('/users', usersRouter);
app.use('/comercios', comerciosRouter);
app.use('/experiencias', experienciasRouter);
app.use('/orden', ordenRouter);
app.use('/carrito', carritoRouter);
app.use('/itemCarrito', itemCarritoRouter);
app.use('/categorias', categoriasRouter); 
app.use('/itemOrden', itemOrden)

export default app;
