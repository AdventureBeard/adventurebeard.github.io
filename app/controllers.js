angular.module('app.controllers', [
    'app.directives'
])


    .controller('PostController', ['$scope', '$http', function($scope, $http) {
        $scope.message = 'TEST TEST TEST';
        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data;
        });
    }])

    .controller('PageController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
        $http.get('data/pages.json').success(function(data) {
            $scope.page = data[$routeParams.id];
        });
    }])

    .controller('SinglePostController', ['$scope', '$http', '$routeParams', function($scope, $http,
                                                                                 $routeParams) {
        $http.get('data/posts.json').success(function(data) {
            $scope.post = data[$routeParams.id];
        });
    }]);