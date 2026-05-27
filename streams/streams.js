'use strict';

const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');
const split = require('split');

const READ_FILE_PATH = path.resolve(__dirname, 'data', 'loans.jsonl');
const WRITE_FILE_PATH = path.resolve(__dirname, 'data', 'loans.filtered.jsonl');

const filterCondition = (elem) => elem && elem.home_ownership === 'RENT';

const filterData = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,
    transform(chunk, encoding, callback) {
      let obj;
      try {
        obj = JSON.parse(chunk.toString());
      } catch (e) {
        return callback();
      }
      const keep = fn(obj);
      callback(null, keep ? chunk : undefined);
    },
  });

const riskProfile = (elem) => {
  elem.risk_profile = elem.loan_amount > 5000 ? 'high' : 'low';
  return JSON.stringify(elem);
};

const transformData = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,
    transform(chunk, encoding, callback) {
      try {
        const out = fn(JSON.parse(chunk));
        callback(null, `${out}\n`);
      } catch (e) {
        callback(e);
      }
    },
  });

async function run() {
  if (!fs.existsSync(READ_FILE_PATH)) {
    console.error(`Input file not found: ${READ_FILE_PATH}`);
    console.error('Run "npm run generate" first to create sample data.');
    process.exit(1);
  }

  const readStream = fs.createReadStream(READ_FILE_PATH);
  const writeStream = fs.createWriteStream(WRITE_FILE_PATH);

  const startedAt = Date.now();

  try {
    await pipeline(
      readStream,
      split(),
      filterData(filterCondition),
      transformData(riskProfile),
      writeStream
    );
    const elapsed = Date.now() - startedAt;
    console.log(`Pipeline succeeded in ${elapsed} ms.`);
    console.log(`Output written to ${WRITE_FILE_PATH}`);
  } catch (err) {
    console.error('Pipeline failed.', err);
    process.exit(1);
  }
}

run();
