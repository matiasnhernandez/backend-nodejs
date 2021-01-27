const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/database');
const logger = require('../../../helpers/logger')(module);
const Transferencia = db.Transferencia;
const cuentaService = require('../services/cuenta.service');

module.exports = {
    getAll,
    getById,
    create
};

async function getAll(userId) {

    //return await Transferencia.find({ usuario: userId });
    return await Transferencia.find().populate('idCuentaOrigen').populate('idCuentaDestino');
}

async function getById(id) {
    return await Transferencia.findById(id);
}

async function create(transferenciaParam, userId) {

    //Recuperamos la cuenta de origen
    var cuentaOrigen = await cuentaService.getById(transferenciaParam.idCuentaOrigen);

    //Validamos que exista la cuenta de origen
    if (!cuentaOrigen){
        throw 'Cuenta origen no encontrada';
    }

    //Validamos el estado de la cuenta de origen
    if (cuentaOrigen.estado != 'abierta'){
        throw 'Cuenta origen con estado invalido para realizar transferencias';
    }

    //Validamos que la cuenta de origen tenga saldo para realizar la transferencia
    if ( parseFloat(transferenciaParam.importe) > parseFloat(cuentaOrigen.saldo.toString()) ){
        throw 'Saldo insuficiente';
    }
    

    //Recuperamos la cuenta de destino
    var cuentaDestino = await cuentaService.getById(transferenciaParam.idCuentaDestino);

    //Validamos que exista la cuenta de destino
    if (!cuentaDestino){
        throw 'Cuenta destino no encontrada';
    }

    //Validamos el estado de la cuenta de destino
    if (cuentaDestino.estado != 'abierta'){
        throw 'Cuenta destino con estado invalido para realizar transferencias';
    }

    //Actualizamos el saldo de la cuenta de origen
    var nuevoSaldoOrigen = parseFloat(cuentaOrigen.saldo) - parseFloat(transferenciaParam.importe);
    cuentaOrigen.saldo = parseFloat(nuevoSaldoOrigen).toFixed(2);
    cuentaService.update(cuentaOrigen._id, cuentaOrigen);

    //Actualizamos el saldo de la cuenta de destino
    var nuevoSaldoDestino = parseFloat(cuentaDestino.saldo) + parseFloat(transferenciaParam.importe);
    cuentaDestino.saldo = parseFloat(nuevoSaldoDestino).toFixed(2);
    cuentaService.update(cuentaDestino._id, cuentaDestino);

    //Grabamos la transferencia
    transferenciaParam.usuario = userId;
    const transferencia = new Transferencia(transferenciaParam);
    
    return transferencia.save();

}