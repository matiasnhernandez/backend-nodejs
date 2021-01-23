const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// routes
router.post('/login', usuarioController.login);
router.post('/registrar', usuarioController.registrar);
router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController._delete);

module.exports = router;