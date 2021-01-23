var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsuarioSchema = new Schema({

    username: {
        type: String,
        unique: true,
        trim: true,  
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    hash: {
        type: String,
        trim: true,
        required: true
    },
    nombre: {
        type: String,
        trim: true,  
        required: true,
    },
    apellido: {
        type: String,
        trim: true,  
        required: true,
    },
    direccion: {
        type: String,
        trim: true
    },
    fechaNacimiento: {
        type: Date
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
   });

module.exports = mongoose.model('Usuario', UsuarioSchema);