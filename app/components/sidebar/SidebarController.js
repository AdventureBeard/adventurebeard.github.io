
angular.module('app.controllers')

    .controller('SidebarController', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {

        var colors = ['RdPu', 'GnBu', 'BuPu', 'PuBu', 'PuRd', 'BuGn', 'Purples'];  // Color palettes to be randomly selected by Trianglify.

        $scope.trianglify = function () {
            var canvas = document.getElementById('sidebarCanvas');
            var container = document.getElementById('sidebarCanvasContainer');

            var pattern = Trianglify({
                cell_size: 75,
                variance: Math.random(),
                height: window.outerHeight,
                width: 300,
                x_colors: colors[Math.floor(Math.random() * colors.length)],
                y_colors: colors[Math.floor(Math.random() * colors.length)]
            });
            pattern.canvas(canvas);
        };

        $scope.trianglify();
    });
