const fs = require('fs');
const path = require('path');
const split = require('split');
const { Transform, pipeline } = require('stream');

let lineCount = 0;

const filterData = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      let take;
      let obj;
      try {
        obj = JSON.parse(chunk.toString());
      } catch (e) {}
      try {
        take = fn(obj);
      } catch (e) {
        return callback(e);
      }
      return callback(null, take ? chunk : undefined);
    },
  });

const transformData = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      // console.log(chunk);
      let take;
      try {
        take = fn(JSON.parse(chunk));
      } catch (e) {
        return callback(e);
      }
      return callback(null, `${take}\n`);
    },
  });

const filterCondition = elem => {
  if (elem) {
    return elem.home_ownership === 'RENT';
  }

  return false;
};

const riskProfile = elem => {
  elem.risk_profile = elem.loan_amount > 5000 ? 'high' : 'low';
  return JSON.stringify(elem);
};

const READ_FILE_PATH = '../resources/loan-data.json';
const WRITE_FILE_PATH = '../resources/risk-profile.json';

const readStream = fs.createReadStream(path.resolve(READ_FILE_PATH));
const writeStream = fs.createWriteStream(path.resolve(WRITE_FILE_PATH));

pipeline(
  readStream,
  split(),
  filterData(filterCondition),
  transformData(riskProfile),
  writeStream,
  err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  },
);
