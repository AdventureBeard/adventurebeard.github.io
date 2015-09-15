/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$rootScope', '$routeParams', 'PostService', function($scope, $rootScope, $routeParams, PostService) {

        var selectedId = $routeParams.id;
        var posts = PostService.getPosts();
        
        for (var p in posts) {
            if (p.id == selectedId) {
                $scope.content = markdown.toHTML(posts[selectedId].content);
            }
        }

        $rootScope.showNavbar = true;
    }]);

