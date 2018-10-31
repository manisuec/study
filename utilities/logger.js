'use strict';

const pino = require('pino'),
  fs = require('fs'),
  path = require('path'),
  logDir = 'log';
  
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
  
const logStream = fs.createWriteStream(path.resolve(logDir, 'pino.log'), {flags: 'a'}, 'utf8');

module.exports = (function () {
  let instance;
  function createInstance() {
      let logger = pino(logStream);
      return logger;
  }
  return {
      getInstance: function () {
          if (!instance) instance = createInstance();
          return instance;
      }
  };
})();