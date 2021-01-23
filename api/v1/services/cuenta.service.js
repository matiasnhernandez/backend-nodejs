const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/database');
const logger = require('../../../helpers/logger')(module);
const Cuenta = db.Cuenta;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {

    return await Cuenta.find({ usuario: userId });
    //return await Cuenta.find().populate('usuario', 'username'); //Retorno el usuario, pero selecciono el username
    return await Cuenta.find().populate('usuario');
}
/*
async function getAll(userId) {
   //return await Cuenta.find().populate('usuario', 'username'); //Retorno el usuario, pero selecciono el username
    return await Cuenta.find().populate('usuario');
}
*/

async function getById(id) {
    return await Cuenta.findById(id);
}

async function create(cuentaParam, userId) {
    cuentaParam.usuario = userId;

    cuentaParam.banco  = '0017';
    cuentaParam.numero = generateRandomBetween(1, 999999);
    cuentaParam.digito = generateRandomBetween(1, 9);

    const cuenta = new Cuenta(cuentaParam);

    // save cuenta
    return await cuenta.save();

}

async function update(id, cuentaParam) {
    const cuenta = await Cuenta.findById(id);

    // validate
    if (!cuenta) throw 'Cuenta not found';
    //if (cuenta.username !== cuentaParam.username && await Cuenta.findOne({ username: cuentaParam.username })) {
    //    throw 'username "' + cuentaParam.username + '" ya esta en uso';
    //}

    // copy cuentaParam properties to cuenta
    Object.assign(cuenta, cuentaParam);

    await cuenta.save();
}

async function _delete(id) {
    await Cuenta.findByIdAndRemove(id);
}

function generateRandomBetween(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}