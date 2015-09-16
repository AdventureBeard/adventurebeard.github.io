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

app.get('/posts', function (req, res) {
	var posts;
	var query = "SELECT * FROM posts";
	
	connection.query( query, function(err, data) {
		if (err) {
			throw err;
		} else {
			posts = data;
			res.send(posts);
		}
	})
});

app.get('/posts/published', function(req, res) {
	var posts;
	var query = "SELECT * FROM posts WHERE published=true";
	connection.query(query, function(err, data) {
		if (err) {
			throw err;
		} else {
			posts = data;
			res.send(posts);
		}
	})
});

app.post('/posts/toggle', function(req, res) {
	var id = req.body.id;
	var query = "UPDATE posts SET published = !published WHERE id=?";
	connection.query(query, [id], function(err, result) {
		if (err) {
			throw err;
		} else {
			res.send(result);
		}
	})
});

app.get('/posts/new', function(req, res) {
	var date = new Date();
	var post = { title: 'New Post', author: 'Author', date: date, published: 0, content: 'Content goes here.'};
	connection.query("INSERT INTO posts SET ?", [post], function(err, result) {
		if (err) {
			throw err;
		} else {
			res.send(result);
		}
	})
	
});

app.post('/posts/select', function(req, res) {
	var id = req.body.id;
	console.log(id);
	connection.query("SELECT * FROM posts WHERE id=?", id, function(err, result) {
		if (err) {
			throw err;
		} else {
			console.log(result.content);
			res.send(result);
		}
	})
});

// TODO: Learn how to do multiple queries atomically in a way that isn't hideous.

app.put('/posts/update', function(req, res) {
	var id = req.body.id;
	var content = req.body.content;
	var title = req.body.title;
	var date = req.body.date;
	console.log("Updated a post:");
	console.log("id: " + id);
	console.log("title: " + title);
	console.log("date: " + date);
	console.log("content: " + content.substring(0, 30) + "...");
	
	var query = "UPDATE posts SET title=?,date=?,content=? WHERE id=?;";
	connection.query(query, [title, date, content, id], function(err, result) {
		if (err) {
			throw err;
			console.log("ERR");
		} else {
			console.log("Did a thing.");
			res.send();
		}
	})
});


app.put('/posts/delete', function(req, res) {
	var id = req.body.id;
	connection.query("DELETE FROM posts WHERE id=?", [id], function(err, result) {
		if (err) {
			throw err;
		} else {
			res.send();
		}
	})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Express server started on http://%s:%s", host, port);
});
