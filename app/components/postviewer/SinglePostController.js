/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')
    
 .controller('SinglePostController', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
        $http.get('data/posts.json').success(function(data) {
            $scope.post = data[$routeParams.id];
        });

        $rootScope.showNavbar = true;
    }]);

