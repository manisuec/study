'use strict';

const winston = require('winston'),
  fs = require('fs'),
  logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

module.exports = (function () {
    let instance;
    function createInstance() {
        let logger = new winston.Logger({
      level: 'info',
			transports: [
        new (winston.transports.File)({
          filename: `${logDir}/winston.log`
        })
			]
		});
        return logger;
    }
    return {
        getInstance: function () {
            if (!instance) instance = createInstance();
            return instance;
        }
    };
})();
