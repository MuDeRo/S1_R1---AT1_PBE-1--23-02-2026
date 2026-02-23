import express from 'express';
const router = express.Router();
import produtoController from '../controllers/produtoController.js';
import uploadImage from '../middlewares/uploadImages.js';

router.get('/produtos', produtoController.buscarTodosProdutos);
router.post('/produtos', uploadImage, produtoController.incluirProduto);
router.delete('/produtos/:idProduto', produtoController.excluirProduto);
router.put('/produtos/:idProduto', uploadImage, produtoController.atualizarProduto);


export default router;