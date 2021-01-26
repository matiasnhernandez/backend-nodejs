var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SucursalSchema = new Schema({

    codigo: {
        type: String,
        trim: true,  
        required: true
    },
    descripcion: {
        type: String,
        trim: true,  
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Sucursal', SucursalSchema);