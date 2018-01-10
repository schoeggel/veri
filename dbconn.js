const conndetails = {
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
};


exports.conndetails = conndetails;

exports.check = function() {	
	var mysql = require('mysql');
	var connection = mysql.createConnection(conndetails);	
	var cnstatus = 'init';
	connection.connect(
		function(err) {
				if (err) {
					console.log('dbconn ---> Database connection failed: ' + err.stack);
					cnstatus = 'Fehler';
				}
		cnstatus = 'db check ok 1';
	});
	
	connection.end();
	console.log('db-connection test end.');
	return (cnstatus);
	}


