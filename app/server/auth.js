function Auth(bcrypt, database, credentials, jwt) {

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
					token = jwt.sign(user[0], credentials.secret);
					res.send( {user : user[0].username, token: token, message: "Correct"});
		        } else {
		            res.send("Incorrect password.");
		        }
		    } else {
		        res.send("User not found.");
		    }
		});
    }
	
	this.distributeToken = function(user, req, res) {

	}
}



module.exports = Auth;