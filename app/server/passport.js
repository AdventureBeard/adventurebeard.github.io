var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, database) {
	
	passport.use (new LocalStrategy(
		function(username, password, done) {
			database.findUser( {username: username }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null,false, {message: 'Incorrect username.' });
				}
				
				if (!user.validPassword(password)) {
					return done(null, false, {message: 'Incorrect password.' });
				}
				
				return done(null, user);
			});
		}
	));
}
	
