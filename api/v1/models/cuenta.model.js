var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CuentaSchema = new Schema({

    banco: {
        type: String,
        trim: true,  
        required: true
    },
    sucursal: {
        type: String,
        trim: true,  
        required: true
    },
    tipoCuenta: {
        type: String,
        trim: true,
        required: true
    },
    moneda: {
        type: String,
        enum : ['0','2', '8'],
        required: true
    },
    numero: {
        type: String,
        trim: true,
        required: true
    },
    digito: {
        type: String,
        trim: true,  
        required: true,
    },
    saldo: {
        type: mongoose.Decimal128,
        required: true,
        default: 0
    },
    estado: {
        type: String,
        enum : ['abierta','cerrada', 'cancelada'],
        required: true,
        default: 'abierta'

    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaAlta: { 
        type: Date, 
        default: Date.now 
    },
    fechaModificacion: { 
        type: Date, 
        default: Date.now 
    }
});

CuentaSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.saldo = ret.saldo.toString();
      return ret;
    },
  });

module.exports = mongoose.model('Cuenta', CuentaSchema);