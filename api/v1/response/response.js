
const respuesta = {
    error: false,
    codigo: 200,
    mensaje: '',
    data: {}
};

function build(error, code, message, data) {
    respuesta.error     = (typeof error !== 'undefined') ?  error : false;
    respuesta.codigo    = (typeof code !== 'undefined') ?  code : 200;
    respuesta.mensaje   = (typeof message !== 'undefined') ?  message : '';
    respuesta.data      = (typeof data !== 'undefined') ?  data : {};
    return respuesta;
}
module.exports = {build};