'use strict';

const logger = require('./logger.js').getInstance();

const _MAX_LINES_ = 100000;

let lines = _MAX_LINES_;

const startTS = Date.now();

while (lines--) {
  logger.info(`Logging at info level line number: ${lines}`);
}

const endTS = Date.now() - startTS;
console.log(`Time taken to log ${_MAX_LINES_} is ${endTS}`);
