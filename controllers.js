angular.module('app.controllers', [])


    .controller('PostController', ['$scope', '$http', function($scope, $http) {
        $scope.message = 'TEST TEST TEST';
        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data;
        });
}]);