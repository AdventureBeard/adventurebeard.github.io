/**
 *
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
     .controller('PostListController', ['$scope', '$http', function($scope, $http) {

        $scope.currentPage = 1;
        $scope.pageSize = 4;
        $scope.posts = [];
        $scope.totalPages = 0;

        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data.reverse();
            $scope.totalPages = Math.ceil($scope.posts.length / $scope.pageSize);

        });

        $scope.changePage = function(x) {
            $scope.currentPage = $scope.currentPage + x;
        }


    }]);
