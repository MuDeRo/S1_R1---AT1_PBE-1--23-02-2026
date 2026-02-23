import express from 'express';
const router = express.Router();
import categoriaController from '../controllers/categoriaController.js';

router.get('/categorias', categoriaController.buscarTodasCategorias);
router.post('/categorias', categoriaController.incluirCategoria);
router.delete('/categorias/:idCategoria', categoriaController.excluirCategoria);
router.put('/categorias/:idCategoria', categoriaController.atualizarCategoria);


export default router;