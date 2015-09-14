/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$rootScope', '$http', '$routeParams', 'DataService', function($scope, $rootScope, $http, $routeParams, DataService) {

        $scope.post = null;
        var selectedId = $routeParams.id;

        for (var post in $scope.posts) {
            if (post.id == selectedId) {
                $scope.post = post;
            }
        }



        DataService.selectPost({id: selectedId}, function(callback) {
            $scope.content = markdown.toHTML(callback[0].content);
        });

        $rootScope.showNavbar = true;
    }]);

