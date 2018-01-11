const conndetails = {
  host     : process.env.RDS_HOSTNAME || 'localhost',
  user     : process.env.RDS_USERNAME || 'root',
  password : process.env.RDS_PASSWORD || 'joko',
  port     : process.env.RDS_PORT || '3306',
  database : 'test'
};
exports.conndetails = conndetails;		// für /env anfrage

const mysql = require('mysql');

module.exports.execute = function(sql, onSucces, onError) {
    var db = new mysql.createConnection(conndetails);
    db.query(sql, function(err, rows, fields) {
        if (err) {
            if (onError) {
                onError(err);
            } else {
                console.log("Error: ", err);
            }
        } else {
            if (onSucces) {
                onSucces(rows);
            } else {
                console.log("Loaded data: ", rows);
            }
        }
    });
    db.end();
};