const exceljsStream = require('exceljs-transform-stream');
const fs = require('fs');
const path = require('path');
const { format, parse } = require('date-fns');

const file = fs.createReadStream(path.resolve('../resources/BoQ_Items.xlsx'));
file.pipe(exceljsStream({ objectMode: true })).on('data', d => {
  // console.log(d['Expected Completion Date']);
  // console.log(JSON.stringify(d));
  let date = d['Expected Completion Date'];
  console.log(new Date(date).getTime());
});
