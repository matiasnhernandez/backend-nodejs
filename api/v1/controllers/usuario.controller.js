const logger = require('../../../helpers/logger')(module);
const usuarioService = require('../services/usuario.service');
const response = require('../response/response')

function login(req, res, next) {
    logger.info('login');
    usuarioService.login(req.body)
        .then(usuario => usuario ? res.json(response.build(false, 200, 'login correcto', usuario)) : res.status(400).json(response.build(true, 400, 'Username or password is incorrect')))
        .catch(err => next(err));
}

function registrar(req, res, next) {
    logger.info('registrar');
    usuarioService.create(req.body)
        .then(usuario => usuario ? res.json(response.build(false, 200, 'usuario registrado correctamente', usuario)) : res.status(400).json(response.build(true, 400, 'Error al registrar el usuario')))
        //.then(() => res.json(response.build(false, 200, 'usuario registrado correctamente')))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    logger.info('getAll');
    usuarioService.getAll()
        .then(usuarios => res.json(response.build(false, 200, 'consulta realizada correctamente', usuarios)))
        .catch(err => next(err));
}

function getById(req, res, next) {
    logger.info('getById');
    usuarioService.getById(req.params.id)
        .then(usuario => usuario ? res.json(response.build(false, 200, 'consulta realizada correctamente', usuario)) : res.status(404).json(response.build(true, 404, 'usuario no encontrado')))
        .catch(err => next(err));
}

function update(req, res, next) {
    logger.info('update');
    usuarioService.update(req.params.id, req.body)
        .then(() => res.json(response.build(false, 200, 'Operacion realizada correctamente')))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    logger.info('_delete');
    usuarioService.delete(req.params.id)
        .then(() => res.json(response.build(false, 200, 'Operacion realizada correctamente')))
        .catch(err => next(err));
}

module.exports = {
    login,
    registrar,
    getAll,
    getById,
    update,
    _delete    
};