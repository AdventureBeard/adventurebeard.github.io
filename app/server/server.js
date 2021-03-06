var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('/root/applications/dependencies/node_modules/jsonwebtoken/index.js');

// MY MODULES
var Database = require('./database.js');
var Routes = require('./routes.js');
var Auth = require('./auth.js');
var Credentials = require('/root/applications/dependencies/adventurebeard.github.io/credentials.js');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

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

console.log("Running ADVENTUREBEARD 1.0");
console.log("Yeah!");
console.log("Still trying to test autodeploy...");

