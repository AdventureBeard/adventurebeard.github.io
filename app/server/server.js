var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var routes = require('routes.js');
var credentials = require('./credentials.js');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

var connection = mysql.createConnection({
	host: credentials.host,
	user: credentials.user,
	password: credentials.password
});

connection.query("use blogposts");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
  next()
});

console.log("NODE JS HELL YEAH");

app.get('/', function (req, res) {
	var posts;
	var query = "select * from posts";
	
	connection.query( query, function(err, data) {
		if (err) {
			throw err;
		} else {
			posts = data;
			res.send(posts);
		}
	})
});

app.get('/new', function(req, res) {
	console.log(new Date());
	var post = { title: 'New Post', author: 'Author', date: '0000-00-00 00:00:00'};
	connection.query("INSERT INTO posts SET ?", [post], function(err, result) {
		if (err) {
			throw err;
		} else {
			console.log("Created new post metadata.");
		}
	})
	
	var postContent = { content:"This is where you type post content! It's markdown compatible!" };
	connection.query("INSERT INTO postcontent SET ?", postContent, function(err, result) {
		if (err) {
			throw err;
		} else {
			console.log("Created new post content.");
		}
		res.send("DID IT");
	})
});

app.post('/select', function(req, res) {
	var id = req.body.id;
	connection.query("SELECT * FROM postcontent WHERE id=?", id, function(err, result) {
		if (err) {
			throw err;
		} else {
			res.send(result);
		}
	})
});

// TODO: Learn how to do multiple queries atomically in a way that isn't hideous.

app.put('/update', function(req, res) {
	var id = req.body.id;
	var content = req.body.content;
	var title = req.body.title;
	var date = req.body.date;
	var query1 = "UPDATE postcontent SET content=? WHERE id=?;";
	var query2 = "UPDATE posts SET title=?,date=? WHERE id=?;";
	connection.query(query1, [content, id] , function(err, result) {
		if (err) {
			throw err;
		} else {
			connection.query(query2, [title, date, id], function(err, result) {
				if (err) {
					throw err;
				} else {
					res.send();
				}
			})
		}
	})
});

app.put('/delete', function(req, res) {
	console.log("Got a delete query.");
	var id = req.body.id;
	connection.query("DELETE FROM posts WHERE id=?", [id], function(err, result) {
		if (err) {
			throw err;
		} else {
			connection.query("DELETE FROM postcontent WHERE id=?", [id], function(err, result) {
				if (err) {
					throw err;
				} else {
					res.send();
				}
			})
		}
	})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server started on http://%s:%s", host, port);
});
