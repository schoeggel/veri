var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
	stats = require('./actions');

const conndetails = {
  host     : process.env.RDS_HOSTNAME || 'localhost',
  user     : process.env.RDS_USERNAME || 'root',
  password : process.env.RDS_PASSWORD || 'joko',
  port     : process.env.RDS_PORT || '3306',
  database : 'test'
};

var mysql      = require('mysql');
var connection = mysql.createConnection(conndetails);

	
console.log("Hello world!");
console.log("Test stats 1. barcode 123 --> " + stats.artikelNr('123'));
console.log("Test stats 2. artikel = 002056 --> " + JSON.stringify(stats.stats('002056')));
	
http.createServer(function (req, res) {
  if (req.url.indexOf('/img') != -1) {
    var filePath = req.url.split('/img')[1];
    fs.readFile(__dirname + '/public/img' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'image/svg+xml'});
      res.write(data);
      res.end();
    });

	} else if (req.url.indexOf('/dbcheck') != -1) {
		res.writeHead(200, {'Content-Type': 'JSON'});
		console.log('dbcheck --> ');
		connection.query('select 1 as results', function (error, results, fields) {
			if (error){
				res.write('query error');
				console.log('Query error! ');
				console.log(error);
			} else {
				console.log('The result[0] is: ', results[0]);
				console.log('The result is: ', results);
				res.write(results);
			};
		res.end();});		
		connection.end();
		

  } else if (req.url.indexOf('/env') != -1) {
    var filePath = req.url.split('/db')[1];
    res.writeHead(200, {'Content-Type': 'text/text'});
	  res.write('env.infos= ' + JSON.stringify(conndetails));
      res.end();
	  
} else if (req.url.indexOf('/stats') != -1) {
    var artikelnr = req.url.split('/js')[1];
    res.write('Artikelnr= ' , artikelnr); 
	 
	connection.query("SELECT * FROM verkauf", function (error, results, fields) {
			res.write('checking for err...'	);
			if (error){
				res.write('query error');
				console.log('Query error! ');
				console.log(error);
			} else {
				console.log('The result[0] is: ', results[0]);
				console.log('The result is: ', results);
				res.write(JSON.stringify(results));
			};
			res.end();});		
		connection.end();
	
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
