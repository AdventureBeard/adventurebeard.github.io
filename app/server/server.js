var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var credentials = require('./credentials.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


var Database= require('./database.js');
var Routes = require('./routes.js');
var Auth = require('./auth.js');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

console.log(bcrypt.hashSync('waffle11'));

var auth = new Auth(bcrypt);
var database = new Database(mysql, credentials, auth);
var routes = new Routes(app, database);


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server started on http://%s:%s", host, port);
});

console.log("Let's do this.");
