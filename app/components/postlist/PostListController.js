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

        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data.reverse();

        });

        $scope.pageChangeHandler = function(page) {
            console.log(page);
        }


    }]);
