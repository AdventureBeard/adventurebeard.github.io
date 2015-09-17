var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var Database= require('./database.js');
var Routes = require('./routes.js');
var credentials = require('./credentials.js');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

var database = new Database(mysql, credentials);
var routes = new Routes(app, database);

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server started on http://%s:%s", host, port);
});

console.log("Let's do this.");
