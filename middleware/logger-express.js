const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.colorize(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      //const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${timestamp} [logger-express.js] [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    })
  )
});

const expressLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  meta: true,
  colorize: true,
  winstonInstance: logger
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

module.exports = {
  expressLogger
};