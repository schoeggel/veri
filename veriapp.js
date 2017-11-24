var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');
	console.log("Test JOKO")
var express = require('express');
var app = express();


app.get("/", function(req, res, next) {
res.send('Hi');
});

app.listen(4000);