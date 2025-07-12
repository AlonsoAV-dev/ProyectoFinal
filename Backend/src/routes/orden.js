import express from 'express'

import controller from '../controllers/orden.js'

const router = express.Router();

// Rutas básicas CRUD
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

// Rutas específicas para órdenes
router.get('/usuario/:idUsuario', controller.findByUsuario); // Órdenes por usuario
router.get('/detalle/:id', controller.findOneWithDetails); // Orden con detalles completos

// Rutas para crear órdenes desde carrito
router.post('/crear-desde-carrito', controller.createFromCarrito);

// Rutas para actualizar estado específico
router.put('/estado/:id', controller.updateEstado);

// Rutas para validaciones y cálculos
router.post('/validar-stock', controller.validateStock);
router.post('/calcular-totales', controller.calculateTotals);

// Rutas para estadísticas y reportes
router.get('/admin/estadisticas', controller.getEstadisticas);

export default router;
