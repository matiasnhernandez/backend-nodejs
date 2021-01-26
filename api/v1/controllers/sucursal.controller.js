const logger = require('../../../helpers/logger')(module);
const sucursalService = require('../services/sucursal.service');
const response = require('../response/response')

function create(req, res, next) {
    logger.info('create');
    sucursalService.create(req.body)
        .then(sucursal => sucursal ? res.json(response.build(false, 200, 'Sucursal creada correctamente', sucursal)) : res.status(400).json(response.build(true, 400, 'Error al crear la sucursal')))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    logger.info('getAll');
    sucursalService.getAll()
        .then(sucursales => res.json(response.build(false, 200, 'consulta realizada correctamente', sucursales)))
        //.then(sucursales => console.log(sucursales))
        .catch(err => next(err));
}

function getById(req, res, next) {
    logger.info('getById');
    sucursalService.getById(req.params.id)
        .then(sucursal => sucursal ? res.json(response.build(false, 200, 'consulta realizada correctamente', sucursal)) : res.status(404).json(response.build(true, 404, 'sucursal no encontrado')))
        .catch(err => next(err));
}

function update(req, res, next) {
    logger.info('update');
    sucursalService.update(req.params.id, req.body)
        .then(() => res.json(response.build(false, 200, 'Operacion realizada correctamente')))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    logger.info('_delete');
    sucursalService.delete(req.params.id)
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