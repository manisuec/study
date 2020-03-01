const csv = require('csvtojson');
const fs = require('fs');

const readStream = fs.createReadStream('../resources/loan-data.csv');

const writeStream = fs.createWriteStream('../resources/loan-data.json');

readStream.pipe(csv()).pipe(writeStream);
