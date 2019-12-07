const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const lineSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    console.log(chunk);
    this.push(
      chunk
        .toString()
        .trim()
        .split('\n'),
    );
    callback();
  },
});

const commaSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(
      chunk
        .toString()
        .trim()
        .split(','),
    );
    callback();
  },
});

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    console.log(chunk.length);
    this.push(chunk);
    callback();
  },
});

const FILE_PATH = '../resources/loan_final313.csv';

const processLine = chunkData => {
  let lines = chunkData.split('\n');

  for (let line of lines) {
    console.log(line);
  }

  return lines[lines.length - 1];
};

const readStream = fs.createReadStream(path.resolve(FILE_PATH), {
  encoding: 'utf8',
});

// let last = '';
// readStream.on('data', chunk => {
//   last = processLine(last + chunk);
// });

// readStream.on('end', () => {
//   console.log('There will be no more data.');
// });

readStream
  .pipe(lineSplitter)
  .pipe(commaSplitter)
  .pipe(arrayToObject);
