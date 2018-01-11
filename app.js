var port = process.env.PORT || 3000;
const stats = require('./actions'),		// statistik abfragen	
		 db = require('./dbconn')		// db helper
	express = require('express'),
		app = express();
		
		
console.log("Hello world!");
console.log("Test stats 1. barcode 123 --> " + stats.artikelNr('123'));
console.log("Test stats 2. artikel = 002056 --> " + JSON.stringify(stats.stats('002056')));

app.get('/artikel/:nr', function(req, res){
// Artikelstatistik liefern

	var artikelnr = req.params.nr;
	console.log('Artikelnummer=' + artikelnr);
	stats.stats(artikelnr, function(results){
		console.log('CHARLIE');
		console.log(results);
		res.json(results);
		res.end()
	},
	function(error){
		console.log('FOXTROTT');
		console.log(error);
		res.status(500);
		res.json(error);
		res.end()
	});
});


app.get('/dbcheck', function(req, res){
	// db verbindung prüfen
	db.execute('select 1 as result', 
		
		//db ok
		function(rs){	
			console.log('db check ok.');
			res.json(rs);
			res.end();
			},
			
		//db nicht ok
		function(rs){
		console.log('db check failed.');
		res.status(500);
		res.json(rs);
		res.end();
		});
});


app.get('/env', function(req, res){
	// Zeigt, ob ENV geladen werden konnte oder locals verwendet werden.
	res.json(db.conndetails);
	res.end();
});
	  

app.listen(port, function() {
    console.log("Server listening on port:", port);
});
