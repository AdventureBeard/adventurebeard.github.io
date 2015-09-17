function Auth(bcrypt, database) {

    this.login = function(req, res) {
		if (req.body.username === '') {
			res.send("Please enter a username.");
			return;
		}
		if (req.body.password === '') {
			res.send("Please enter a password.");
			return;
		}
		var username = req.body.username;
		var password = req.body.password;
		var user;
		
		database.getUser(username, function(callback) {
		    user = callback;
		    if (Object.keys(user).length != 0) {
		        if (bcrypt.compareSync(password, user[0].password)) {
		            res.send("Correct password.");
		        } else {
		            res.send("Incorrect password.");
		        }
		    } else {
		        res.send("User not found.");
		    }
		});
    }
}

module.exports = Auth;