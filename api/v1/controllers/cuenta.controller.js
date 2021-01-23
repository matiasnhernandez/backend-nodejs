const logger = require('../../../helpers/logger')(module);
const cuentaService = require('../services/cuenta.service');
const response = require('../response/response')

function create(req, res, next) {
    logger.info('create');
    cuentaService.create(req.body, req.loggedUser)
        .then(cuenta => cuenta ? res.json(response.build(false, 200, 'Cuenta creada correctamente', cuenta)) : res.status(400).json(response.build(true, 400, 'Error al crear la cuenta')))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    logger.info('getAll');
    cuentaService.getAll(req.loggedUser)
        .then(cuentas => res.json(response.build(false, 200, 'consulta realizada correctamente', cuentas)))
        .catch(err => next(err));
}

function getById(req, res, next) {
    logger.info('getById');
    cuentaService.getById(req.params.id)
        .then(cuenta => cuenta ? res.json(response.build(false, 200, 'consulta realizada correctamente', cuenta)) : res.status(404).json(response.build(true, 404, 'cuenta no encontrado')))
        .catch(err => next(err));
}

function update(req, res, next) {
    logger.info('update');
    cuentaService.update(req.params.id, req.body)
        .then(() => res.json(response.build(false, 200, 'Operacion realizada correctamente')))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    logger.info('_delete');
    cuentaService.delete(req.params.id)
        .then(() => res.json(response.build(false, 200, 'Operacion realizada correctamente')))
        .catch(err => next(err));
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    _delete    
};