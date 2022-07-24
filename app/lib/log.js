const _pino = require('pino');

// Turn off logging for unit testing
// if (process.env.NODE_ENV === 'TEST') {
//   log.debug('Setting test logging');
//   log.level = 'OFF';
// }

// Define logging targets - console, log file, etc
const logTargets = [
  {
    target: 'pino-pretty',
    level: 'debug',
    options: {
      colorize: true,
      translateTime: true,
    },
  },
  {
    target: 'pino/file',
    level: global.App.log.file.level,
    options: {
      destination: global.App.log.file.path,
      append: true,
      sync: false,
    }
  },
]

const logOptions = {
  level: global.App.log.level,
  transport: {
    targets: logTargets,
  }
}

module.exports = _pino(logOptions);
