import express from 'express'

import controller from '../controllers/orden.js'

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.get('/usuario/:idUsuario', controller.findByUsuario); // Órdenes por usuario
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

export default router;
