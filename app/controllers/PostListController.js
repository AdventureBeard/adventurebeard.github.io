/**
 *
 *
 * Created by braden on 6/24/15.
 */

controllers
    
     .controller('PostListController', ['$scope', '$http', function($scope, $http) {

        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.posts = [];

        $scope.numberOfPages = function() {
            return Math.ceil($scope.posts.length/$scope.pageSize);
        }

        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data.reverse();

        });


    }]);
