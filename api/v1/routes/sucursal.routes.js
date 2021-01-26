const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursal.controller');

// routes
router.post('/', sucursalController.create);
router.get('/', sucursalController.getAll);
router.get('/:id', sucursalController.getById);
router.put('/:id', sucursalController.update);
router.delete('/:id', sucursalController._delete);

module.exports = router;