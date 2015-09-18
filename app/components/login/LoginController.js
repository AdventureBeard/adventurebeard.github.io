angular.module('app.controllers')
    .controller('LoginController', ['$scope', 'DataService', '$localStorage', '$location', 'AuthService', function ($scope, DataService, $localStorage, $location, AuthService) {
        $scope.username = '';
        $scope.password = '';
        $scope.message = '';

        $scope.submit = function () {
            var obj = {username: $scope.username, password: $scope.password};
            DataService.validateUser(obj, function(callback) {
                $scope.message= callback.message;
                $localStorage.user = callback.user;
                $localStorage.token = callback.token;
                if ($localStorage.token) {
                    AuthService.isLoggedIn = true;
                    $location.path('/editor');
                } else {
                    AuthService.isLoggedIn = false;
                }
            });
        }


    }]);