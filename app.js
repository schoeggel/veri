var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');
	
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();

console.log("Hello world!")

	
	
http.createServer(function (req, res) {
  if (req.url.indexOf('/img') != -1) {
    var filePath = req.url.split('/img')[1];
    fs.readFile(__dirname + '/public/img' + filePath, function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'image/svg+xml'});
      res.write(data);
      res.end();
    });
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
  } else if (req.url.indexOf('/db') != -1) {
	con.query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))", function (err, result, fields) {
    	if (err) throw err;
    	console.log("create table");
  	});
	con.query("SELECT * FROM customers", function (err, result, fields) {
    	if (err) throw err;
    	console.log(result);
	res.writeHead(201, {'Content-Type': 'text/db'});
      	res.write(result);
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
