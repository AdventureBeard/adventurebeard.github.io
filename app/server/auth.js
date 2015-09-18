function Auth(bcrypt, database, credentials, jwt) {

    this.login = function(req, res) {
        if (req.body.username === '') {
            res.send({
                message: "Please enter a username."
            });
            return;
        }

        if (req.body.password === '') {
            res.send({
                message: "Please enter a password."
            });
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
                    console.log("Granting a token.");
                    res.send({
                        user: user[0].username,
                        token: token,
                        message: "Correct"
                    });
                } else {
                    res.send({
                        message: "Incorrect password."
                    });
                }
            } else {
                res.send({
                    message: "User not found."
                });
            }
        });
    }

    this.authenticate = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['authorization'];

        if (token) {
            jwt.verify(token, credentials.secret, function(err, decoded) {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Failed to authenticate."
                    });
                } else {
                    console.log("Verified token.");
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            console.log("Rejected.");
            return res.status(403).send({
                sucess: false,
                message: "No token provided."
            });
        }
    };

}



module.exports = Auth;