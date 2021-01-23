const logger = require('../helpers/logger')(module);

const respuesta = {
    error: true,
    codigo: 200,
    mensaje: ''
};

function errorHandler(err, req, res, next) {

    console.log(err);

    if (typeof (err) === 'string') {
        // custom application error
        logger.error(err);
        respuesta.error = true;
        respuesta.codigo = 400;
        respuesta.mensaje = err;
        return res.status(400).json(respuesta);
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        logger.error(err);
        respuesta.error = true;
        respuesta.codigo = 400;
        respuesta.mensaje = err.message;
        return res.status(400).json(respuesta);
        //return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        logger.error(err);
        respuesta.error = true;
        respuesta.codigo = 401;
        respuesta.mensaje = 'Token invalido';
        return res.status(401).json(respuesta);
        //return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    logger.error(err);
    respuesta.error = true;
    respuesta.codigo = 500;
    respuesta.mensaje = err.message;
    return res.status(500).json(respuesta);
    //return res.status(500).json({ message: err.message });
}

function notFoundHandler (req, res, next) {
    logger.error("endpoint no encontrado " + req.url);
    respuesta.error = true;
    respuesta.codigo = 404;
    respuesta.mensaje = 'endpoint no encontrado';
    return res.status(404).json(respuesta);
}

module.exports = {errorHandler, notFoundHandler};