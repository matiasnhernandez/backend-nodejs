const mongoose = require('mongoose');
const logger = require('../helpers/logger')(module);
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.MONGO_URL, connectionOptions).
  catch(error => handleError(error));

function handleError(error) {
    logger.error(error);
}
mongoose.Promise = global.Promise;

module.exports = {
    Usuario: require('../api/v1/models/usuario.model'),
    Cuenta: require('../api/v1/models/cuenta.model')
};
