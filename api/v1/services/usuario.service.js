const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/database');
const logger = require('../../../helpers/logger')(module);
const Usuario = db.Usuario;

async function login({ username, password }) {
    const usuario = await Usuario.findOne({ username });
    if (usuario && bcrypt.compareSync(password, usuario.hash)) {

        console.log('LALALALA' + JSON.stringify({ sub: usuario.id }));
        const token = jwt.sign({ sub: usuario.id }, process.env.JWT_SECRET, { "expiresIn": process.env.JWT_EXPIRES });
        
        return {usuario, token};
    }
}

async function getAll() {
    return await Usuario.find();
}

async function getById(id) {
    return await Usuario.findById(id);
}

async function create(usuarioParam) {
    // validate
    if (await Usuario.findOne({ username: usuarioParam.username })) {
        throw 'username "' + usuarioParam.username + '" ya esta en uso';
    }

    const usuario = new Usuario(usuarioParam);

    // hash password
    if (usuarioParam.password) {
        usuario.hash = bcrypt.hashSync(usuarioParam.password, 10);
    }

    // save usuario
    await usuario.save();

    const token = jwt.sign({ sub: usuario.id }, process.env.JWT_SECRET, { "expiresIn": process.env.JWT_EXPIRES });
    return {usuario, token};
}

async function update(id, usuarioParam) {
    const usuario = await Usuario.findById(id);

    // validate
    if (!usuario) throw 'Usuario not found';
    if (usuario.username !== usuarioParam.username && await Usuario.findOne({ username: usuarioParam.username })) {
        throw 'username "' + usuarioParam.username + '" ya esta en uso';
    }

    // hash password if it was entered
    if (usuarioParam.password) {
        usuarioParam.hash = bcrypt.hashSync(usuarioParam.password, 10);
    }

    // copy usuarioParam properties to usuario
    Object.assign(usuario, usuarioParam);

    await usuario.save();
}

async function _delete(id) {
    await Usuario.findByIdAndRemove(id);
}

module.exports = {
    login,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};