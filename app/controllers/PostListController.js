/**
 *
 *
 * Created by braden on 6/24/15.
 */

 angular.module('app.controllers')

     .controller('PostListController', ['$scope', '$http', function($scope, $http) {
        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data;
        });

        $scope.currentPage = 0;
        $scope.pageSize = 5;


    }]);
