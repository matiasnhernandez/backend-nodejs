const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/database');
const logger = require('../../../helpers/logger')(module);
const Sucursal = db.Sucursal;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    
    sucursales = Sucursal.find();
    console.log(sucursales);

    return await Sucursal.find();
}

async function getById(id) {
    return await Sucursal.findById(id);
}

async function create(sucursalParam) {

    const sucursal = new Sucursal(sucursalParam);
    return await sucursal.save();

}

async function update(id, SucursalParam) {
    const sucursal = await Sucursal.findById(id);

    // validate
    if (!sucursal) throw 'Sucursal not found';

    // copy SucursalParam properties to sucursal
    Object.assign(sucursal, SucursalParam);

    await sucursal.save();
}

async function _delete(id) {
    await Sucursal.findByIdAndRemove(id);
}
