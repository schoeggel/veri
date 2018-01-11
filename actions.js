db = require('./dbconn');	
	

exports.artikelNr = function(barcode, onSuccess, onError) {
// Dummie Status.
// soll Lookup machen und Artikel finden 
// anhand Lagerplatzbarcode oder Artikel EAN
	return 000670;
};

exports.stats = function(artikelnr, onSuccess, onError){
	// Artikelstatistik Abfrage
	// TODO: die Menge zusätzlich nach Kalenderwoche gruppiert 
	
	console.log('stats aufgerufen.');
	var sql = 'select count(menge) as Zugriffe, sum(menge) as Gesamtmenge, avg(menge) as Durchschnitt from verkauf where artikel in(' + artikelnr + ');';
	db.execute(sql, onSuccess, onError); 
	}




