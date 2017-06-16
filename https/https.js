const fs      = require('fs'),
      https   = require('https'),
      options = { 
        key: fs.readFileSync('./conf/server-key.pem'), 
        cert: fs.readFileSync('./conf/server-crt.pem'), 
        ca: fs.readFileSync('./conf/ca-crt.pem'), 
        requestCert: true, 
        rejectUnauthorized: true
      };
 
https.createServer(options, (req, res) => { 
  console.log(new Date() + ' ' + 
    req.connection.remoteAddress + ' ' + 
    req.socket.getPeerCertificate().subject.CN + ' ' +
    req.method + ' ' + req.url); 
  res.writeHead(200); 
  res.end('Hello world'); 
}).listen(4433);
