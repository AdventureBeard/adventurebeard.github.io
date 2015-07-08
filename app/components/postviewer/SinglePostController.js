/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        $http.get('data/posts.json').success(function(data) {
            $scope.post = data[$routeParams.id];
        });
    }]);
