import express from 'express'

import controller from '../controllers/carrito.js'

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.get('/usuario/:idUsuario', controller.findByUsuario); 
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

export default router;
