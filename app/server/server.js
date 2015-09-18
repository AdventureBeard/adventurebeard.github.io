var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

// MY MODULES
var Database = require('./database.js');
var Routes = require('./routes.js');
var Auth = require('./auth.js');
var Credentials = require('./credentials.js');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

// Modules
var database = new Database(mysql, Credentials);
var auth = new Auth(bcrypt, database, Credentials, jwt);
var routes = new Routes(app, database, auth);

// Server

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express server started on http://%s:%s", host, port);
});

console.log("Let's do this.");
