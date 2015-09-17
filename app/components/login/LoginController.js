angular.module('app.controllers')
    .controller('LoginController', ['$scope', 'DataService', function ($scope, DataService) {

        $scope.username = '';
        $scope.password = '';
        $scope.message = '';

        $scope.submit = function () {
            var obj = {username: $scope.username, password: $scope.password};
            DataService.validateUser(obj, function(callback) {
                console.log(callback);
            })
        }


    }]);