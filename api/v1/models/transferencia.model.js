var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TransferenciaSchema = new Schema({

    idCuentaOrigen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    idCuentaDestino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    concepto: {
        type: String,
        trim: true,
        required: true
    },
    importe: {
        type: mongoose.Decimal128,
        required: true,
        default: 0
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaAlta: { 
        type: Date, 
        default: Date.now 
    }
});

TransferenciaSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.importe = ret.importe.toString();
      return ret;
    },
  });

module.exports = mongoose.model('Transferencia', TransferenciaSchema);