require('dotenv').config();
const config = require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtMiddleware = require('./middleware/jwt-middleware');
const errorHandler = require('./middleware/error-handler').errorHandler;
const notFoundHandler = require('./middleware/error-handler').notFoundHandler;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const loggerExpress = require('./middleware/logger-express');
const logger = require('./helpers/logger')(module);


console.log('PORT:        ' + process.env.PORT);
console.log('MONGO_URL:   ' + process.env.MONGO_URL);
console.log('JWT_SECRET:  ' + process.env.JWT_SECRET);
console.log('JWT_EXPIRES: ' + process.env.JWT_EXPIRES);

app.use(loggerExpress.expressLogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwtMiddleware());

let prefix = '/api/v1/';
app.use(prefix + 'test', require('./api/v1/routes/test.routes'));
app.use(prefix + 'usuarios', require('./api/v1/routes/usuario.routes'));
app.use(prefix + 'cuentas', require('./api/v1/routes/cuenta.routes'));
app.use(prefix + 'sucursales', require('./api/v1/routes/sucursal.routes'));
app.use(prefix + 'transferencias', require('./api/v1/routes/transferencia.routes'));

// global error handler
app.use(errorHandler);
app.use(notFoundHandler);

// start server
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  logger.info('backend-nodejs iniciado correctamente en el puerto ' + port);
});

module.exports = server;