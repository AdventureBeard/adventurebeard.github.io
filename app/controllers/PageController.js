/**
 *
 * Created by braden on 6/24/15.
 */

angular.module('app.controllers')

  .controller('PageController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
        $http.get('data/pages.json').success(function(data) {
            $scope.page = data[$routeParams.id];
        });

    }]);
