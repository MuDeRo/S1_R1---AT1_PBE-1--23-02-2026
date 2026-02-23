import express from 'express';
import categoriaRoutes from './routes/categoriaRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js'
import path from 'path';
import 'dotenv/config';

const app = express();
app.use(express.json()); //sem isso nao funciona a requisição no body

app.use('/', categoriaRoutes);
app.use('/', produtoRoutes);


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://loacalhost:${process.env.SERVER_PORT}`);
});