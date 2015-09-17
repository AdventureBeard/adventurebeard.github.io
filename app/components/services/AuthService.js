angular.module('app.services')
    .service('AuthService', function() {
        var auth = {
            isLoggedIn: false
        };
        return auth;
    });