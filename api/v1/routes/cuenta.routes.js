const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuenta.controller');

// routes
router.post('/', cuentaController.create);
router.get('/', cuentaController.getAll);
router.get('/:id', cuentaController.getById);
router.put('/:id', cuentaController.update);
router.delete('/:id', cuentaController._delete);

module.exports = router;