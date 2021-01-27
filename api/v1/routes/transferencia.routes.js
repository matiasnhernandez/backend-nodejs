const express = require('express');
const router = express.Router();
const transferenciaController = require('../controllers/transferencia.controller');

// routes
router.post('/', transferenciaController.create);
router.get('/', transferenciaController.getAll);
router.get('/:id', transferenciaController.getById);

module.exports = router;