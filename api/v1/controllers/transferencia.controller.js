const logger = require('../../../helpers/logger')(module);
const transferenciaService = require('../services/transferencia.service');
const response = require('../response/response')

function create(req, res, next) {
    logger.info('create');
    transferenciaService.create(req.body, req.loggedUser)
        .then(transferencia => transferencia ? res.json(response.build(false, 200, 'Transferencia realizada correctamente', transferencia)) : res.status(400).json(response.build(true, 400, 'Error al crear la transferencia')))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    logger.info('getAll');
    transferenciaService.getAll(req.loggedUser)
        .then(transferencias => res.json(response.build(false, 200, 'consulta realizada correctamente', transferencias)))
        .catch(err => next(err));
}

function getById(req, res, next) {
    logger.info('getById');
    transferenciaService.getById(req.params.id)
        .then(transferencia => transferencia ? res.json(response.build(false, 200, 'consulta realizada correctamente', transferencia)) : res.status(404).json(response.build(true, 404, 'transferencia no encontrado')))
        .catch(err => next(err));
}

module.exports = {
    create,
    getAll,
    getById
};