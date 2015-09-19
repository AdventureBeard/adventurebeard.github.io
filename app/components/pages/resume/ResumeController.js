/**
 * Created by Braden on 9/18/2015.
 */
angular.module('app.controllers')
    .controller('ResumeController', ['$scope', '$rootScope', function($scope, $rootScope) {

        $scope.title = "Resume";

        $rootScope.showNavbar = true;
    }]);