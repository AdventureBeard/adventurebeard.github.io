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

        var colors = [ 'RdPu', 'GnBu', 'BuPu', 'PuBu', 'PuRd', 'BuGn', 'Purples'];

        $http.get('data/posts.json').success(function(data) {
            $scope.posts = data.reverse();
            $scope.totalPages = Math.ceil($scope.posts.length / $scope.pageSize);
        });

        $scope.changePage = function(x) {
            $scope.currentPage = $scope.currentPage + x;
        }

        var postContainer = document.getElementById('postContainer');
        console.log(postContainer.offsetWidth);

        $scope.trianglify = function( x, title ) {
            var canvas = document.getElementById('triCanvas' + x);
            var compensation = 1;

            if (window.innerHeight < 1000) {
                compensation = 0.5;
            }


            var pattern = Trianglify({
                cell_size: 75,
                variance: Math.random(),
                height: canvas.height,
                width: 600 * compensation,
                x_colors: colors[Math.floor(Math.random() * colors.length)],
                y_colors: colors[Math.floor(Math.random() * colors.length)],
                seed: title

            });
            pattern.canvas(canvas);
        };


    }]);
