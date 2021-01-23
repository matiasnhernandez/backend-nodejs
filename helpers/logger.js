const winston = require('winston');

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

var getLabel = function (callingModule) {
  var parts = callingModule.filename.split('/');
  var module = parts[parts.length - 2] + '/' + parts.pop();
  return module;
};

module.exports = function (callingModule) {

  if (callingModule == undefined){
    callingModule = 'undefined';
  };

  return winston.createLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp(),
      //winston.format.label(getLabel(callingModule)),
      winston.format.label({ label: getLabel(callingModule) }),
      myFormat
    )
  });
};