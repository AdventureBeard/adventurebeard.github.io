function Auth(bcrypt) {

    this.authenticate = function(user, password, callback) {
        if (Object.keys(user).length != 0) {
            if (bcrypt.compareSync(password, user[0].password)) {
                callback("Correct password.");
            } else {
                callback("Incorrect password.");
            }
        } else {
            callback("User not found.");
        }
    }
}

module.exports = Auth;