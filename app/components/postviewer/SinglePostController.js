/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$rootScope', '$routeParams', 'DataService', function($scope, $rootScope, $routeParams, DataService) {

        $scope.content = null;

        DataService.selectPost($routeParams, function (callback) {
            $scope.title = callback[0].title;
            $scope.content = markdown.toHTML(callback[0].content);
            $scope.date = callback[0].date;
        });

        $rootScope.showNavbar = true;
    }]);

