/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$rootScope', '$routeParams', '$location', 'DataService', function($scope, $rootScope, $routeParams, $location, DataService) {

        $scope.content = null;
        $scope.id = $routeParams;
        $scope.disqusId = $routeParams.id;
        $scope.disqusUrl = $location.absUrl();
        console.log("ID:" + $scope.disqusId);
        console.log("URL:" + $scope.disqusUrl);
        $scope.contentLoaded = false;


        DataService.selectPost($routeParams, function (callback) {
            $scope.title = callback[0].title;
            $scope.content = markdown.toHTML(callback[0].content);
            $scope.date = callback[0].date;
            $scope.contentLoaded = true;
        });

        $rootScope.showNavbar = true;
    }]);

