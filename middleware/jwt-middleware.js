const expressJwt = require('express-jwt');
const usuarioService = require('../api/v1/services/usuario.service');

function jwt() {
    
    const secret = process.env.JWT_SECRET;
    return expressJwt({secret ,algorithms: ['HS256'], isRevoked }).unless({
        path: [ '/api/v1/test',
                '/api/v1/usuarios/login',
                '/api/v1/usuarios/registrar']
    });
}

async function isRevoked(req, payload, done) {
    const usuario = await usuarioService.getById(payload.sub);

    // revoke token if usuario no longer exists
    if (!usuario) {
        return done(null, true);
    }

    req.loggedUser = payload.sub;
    done();
};

module.exports = jwt;