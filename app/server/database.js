function Database(mysql, credentials) {

    var connection = mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    });

    connection.query("use blogposts");

    this.getAllPosts = function(req, res) {
        var posts;
        var query = "SELECT * FROM posts";

        connection.query(query, function(err, data) {
            if (err) {
                throw err;
            } else {
                posts = data;
                res.send(posts);
            }
        })
    }

    this.getPublishedPosts = function(req, res) {
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
    }

    this.togglePublished = function(req, res) {
        var id = req.body.id;
        var query = "UPDATE posts SET published = !published WHERE id=?";
        connection.query(query, [id], function(err, result) {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        })
    }

    this.newPost = function(req, res) {
        var date = new Date();
        var post = {
            title: 'New Post',
            author: 'Author',
            date: date,
            published: 0,
            content: 'Content goes here.'
        };
        connection.query("INSERT INTO posts SET ?", [post], function(err, result) {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        })
    }

    this.updatePost = function(req, res) {
        var id = req.body.id;
        var content = req.body.content;
        var title = req.body.title;
        var date = req.body.date;
        var query = "UPDATE posts SET title=?,date=?,content=? WHERE id=?;";
        connection.query(query, [title, date, content, id], function(err, result) {
            if (err) {
                throw err;
            } else {
                res.send();
            }
        })
    }

    this.deletePost = function(req, res) {
        var id = req.body.id;
        connection.query("DELETE FROM posts WHERE id=?", [id], function(err, result) {
            if (err) {
                throw err;
            } else {
                res.send();
            }
        })
    }

    this.getPost = function(req, res) {
        var id = req.body.id;
        connection.query("SELECT * FROM posts WHERE id=?", id, function(err, result) {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        })
    }

    this.getUser = function(username, callback) {
        console.log("DB looking up " + username);
        connection.query("SELECT * FROM users where username=?", username, function(err, user) {
            if (err) {
                throw err;
            } else {
                callback(user);
            }
        })
    }

}

module.exports = Database;

