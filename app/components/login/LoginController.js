angular.module('app.controllers')
    .controller('LoginController', ['$scope', 'DataService', '$localStorage', '$location', function ($scope, DataService, $localStorage, $location) {
        $scope.username = '';
        $scope.password = '';
        $scope.message = '';

        $scope.submit = function () {
            var obj = {username: $scope.username, password: $scope.password};
            DataService.validateUser(obj, function(callback) {
                console.log(callback);
                $scope.message= callback.message;
                $localStorage.user = callback.user;
                $localStorage.token = callback.token;
            })
        }


    }]);