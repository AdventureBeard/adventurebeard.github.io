var getallposts = function(req, res) {
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


var newpost = function(req, res) {
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

var getpost = function(req, res) {
	var id = req.body.id;
	connection.query("SELECT * FROM postcontent WHERE id=?", id, function(err, result) {
		if (err) {
			throw err;
		} else {
			res.send(result);
		}
	})
});

var updatepost = function(req, res) {
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

var deletepost = function(req, res) {
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

module.exports {
	getAllPosts: getallposts,
	newPost: newpost,
	getPost: getpost,
	updatePost: updatepost,
	deletePost: deletepost
};
	


