angular.module('app.controllers')
    .controller('SoundcloudController', ['$scope', '$rootScope', function($scope, $rootScope) {

        $scope.title = "SoundCloud";
        $rootScope.showNavbar = true;

    }]);