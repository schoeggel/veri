
var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
	stats = require('./actions');
	
console.log("Hello world!");
console.log("Test stats 1. barcode 123 --> " + stats.artikelNr('123'));
console.log("Test stats 2. artikel = 002056 --> " + JSON.stringify(stats.stats('002056')));

console.log('db-connection test1.');
var mysql = require('mysql');
console.log('db-connection test2.');
var conndetails = {
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
} 
var connection = mysql.createConnection(conndetails);

console.log('db-connection test3.');
connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

console.log('db-connection test4.');
connection.end();
console.log('db-connection test end.');

	
http.createServer(function (req, res) {
  if (req.url.indexOf('/img') != -1) {
    var filePath = req.url.split('/img')[1];
    fs.readFile(__dirname + '/public/img' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'image/svg+xml'});
      res.write(data);
      res.end();
    });
  } else if (req.url.indexOf('/db') != -1) {
    var filePath = req.url.split('/db')[1];
    console.log('/db called --> filePath = ' + filePath);
	res.writeHead(200, {'Content-Type': 'text/text'});
      res.write('some Text.');
      res.end();

  } else if (req.url.indexOf('/env') != -1) {
    var filePath = req.url.split('/db')[1];
    res.writeHead(200, {'Content-Type': 'text/text'});
      
	  res.write('env.infos= ' + JSON.stringify(conndetails));
      res.end();
 
	  
  } else if (req.url.indexOf('/js') != -1) {
    var filePath = req.url.split('/js')[1];
    fs.readFile(__dirname + '/public/js' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
	} else if (req.url.indexOf('/veri') != -1) {
    var filePath = req.url.split('/veri')[1];
    fs.readFile(__dirname + '/public/veri' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(202, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if(req.url.indexOf('/css') != -1) {
    var filePath = req.url.split('/css')[1];
    fs.readFile(__dirname + '/public/css' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
}).listen(port, '0.0.0.0');
