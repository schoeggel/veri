exports.myDateTime = function () {
    return Date();
}; 

exports.artikelNr = function(barcode) {
	return 136200;
};


exports.stats = function(artikelnr){
	return ({"ArtikelNr" : artikelnr,
			"Menge" : "232",	
	"Zugriffe" : "838"})
}


