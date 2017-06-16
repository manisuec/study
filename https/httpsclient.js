const fs    = require('fs'),
      https = require('https'), 
      options = { 
        hostname: 'localhost', 
        port: 4433, 
        path: '/', 
        method: 'GET', 
        ca: fs.readFileSync('./conf/ca-crt.pem'),
        key: fs.readFileSync('./conf/client2-key.pem'), 
        cert: fs.readFileSync('./conf/client2-crt.pem')
      };
 
const req = https.request(options, (res) => { 
  res.on('data', (data) => { 
    process.stdout.write(data); 
  }); 
});
 
req.end();

req.on('error', (err) => { 
  console.error(err); 
});
