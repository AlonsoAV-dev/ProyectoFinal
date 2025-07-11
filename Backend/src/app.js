import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productosRouter from './routes/productos.js';
import usersRouter from './routes/users.js';
import comerciosRouter from './routes/comercios.js';
import experienciasRouter from './routes/experiencias.js';

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

export default app;
