const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const util = require('util');
const readline = require('readline');
const execFile = util.promisify(require('child_process').execFile);

let count = 1;
// const writeStream = fs.createWriteStream('/Users/manisuec/out_new.json');

const getClient = async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
  
    return client;
  };

async function processLineByLine() {
  try {
    const dbClient = await getClient();
    const insertRecs = [];
    const rl = readline.createInterface({
      input: fs.createReadStream('/Users/manisuec/Downloads/SmartError_label.txt'),
    });

    for await (const line of rl) {
      if (count === 1) {
        console.log('skipping first line');
      } else {
        // console.log(count);
        const toks = line.split(',');
        if(toks.length) {
          let fileName = toks[1];
          const fileToks = fileName.split('_');
          const origToks = fileToks.slice(0, fileToks.length -1);
          let actualFileName = origToks.join('_');
          // console.log(actualFileName);
          // console.log(Number(toks[0]) + 10000)
          const obj = {
            _id: Number(toks[0]) + 10000,
            name: actualFileName,
            label: toks[2]
          };
          // console.log(obj);
          insertRecs.push(obj);
          // await dbClient
          //   .db('supriya')
          //   .collection('solidity')
          //   .insertOne(obj);
        } else {
          console.log('else',toks)
        }
      }
      ++count;
      
    }

    console.log(count, insertRecs.length);

    for (const rec of insertRecs) {
      await dbClient
        .db('supriya')
        .collection('solidity')
        .insertOne(rec);
    }
  } catch (error) {
    console.log(error);
  }
}

// processLineByLine();

// rl.on('line', (input) => {
//   const line = input
//   if (count === 1) {
//     console.log('skipping first line');
//   } else {
//     // console.log(line);
//     const toks = line.split(',');
//     // console.log(toks.length);
//     const obj = {
//       _id: toks[0],
//       name: toks[1],
//       label: toks[2]
//     };
//     // console.log(obj)
//   }
//   ++count;
//   // obj._id = ++count;

//   // writeStream.write(JSON.stringify(obj) + '\n');
// });

// rl.on('close', () => {
//   console.log(count);
// })

const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

// const getClient = async () => {
//   const client = new MongoClient('mongodb://localhost:27017');
//   await client.connect();

//   return client;
// };
const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    // console.log(file);
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

const run = async () => {
  // const outPath = '/Users/manisuec/Downloads/Dataset/';
  let count = 1;

  try {
    const dbClient = await getClient();
    const db = dbClient.db('supriya');
    const collection = db.collection('solidity');
    const fileArr = getAllFiles(
      path.resolve('/Users/manisuec/Downloads/remove_byID/'),
    );

    console.log(fileArr.length);

    // const fileContent = await readFile(path.resolve(`${fileArr[0]}`), 'utf8');
    // console.log(fileContent);

    for (const file of fileArr) {
      try {
        const ext = path.extname(file);
        
        if(ext === '.sol') {
          const fileName = path.basename(file, '.sol');
          const dbName = Number(fileName) + 10000
          const result = await collection.findOne({_id: dbName});

          if(result) {
            console.log(count++);
            const fileContent = await readFile(file, 'utf8');
            const res = await collection.updateOne({_id: dbName}, {$set: {code: fileContent}});
          }
         

          // const { stdout } = await execFile('smartcheck', ['-p', file], {maxBuffer: 51200000});
          // // console.log(stdout);

          // const res = await writeFile(path.resolve(outPath, `${fileName}_${count}.txt`), stdout);

          // // console.log(fileContent);
          // // await dbClient
          // //   .db('supriya')
          // //   .collection('solidity')
          // //   .insertOne({ solidity: fileContent });
          // console.log(count++);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    console.log('End of loop');
  } catch (error) {
    console.log(error);
  }
};

run();
