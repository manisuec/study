const exceljsStream = require('exceljs-transform-stream');
const fs = require('fs');
const path = require('path');
const { format, parse } = require('date-fns');

const readExcel = () => {
  const file = fs.createReadStream(path.resolve('../resources/BoQ_Items.xlsx'));

  let data = [];
  const prArr = [];

  return new Promise((resolve, reject) => {
    file
      .pipe(exceljsStream({ objectMode: true }))
      .on('data', d => {
        // console.log(d['Expected Completion Date']);
        // console.log(JSON.stringify(d));
        const {
          Description: description,
          'Expected Completion Date': date,
        } = d;
        console.log(description);
        console.log(new Date(date).getTime());
        data.push(d);
        if (data.length === 10) {
          let arr = data.slice(0, 10);
          data = [];
          prArr.push(delay(arr));
        }
      })
      .on('end', () => {
        console.log('End Event');
        prArr.push(delay(data));
        return resolve(Promise.all(prArr));
      });
  });
};

const delay = data => {
  // console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('100 ms delay');
      console.log(data);
      return resolve();
    }, 100);
  });
};

const test = async () => {
  console.log('Before read excel');
  await readExcel();
  console.log('Read excel complete');
  // await Promise.all(prArr);
  console.log('After read excel');
};

test();
