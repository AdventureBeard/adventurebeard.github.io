
angular.module('app.directives')

    .directive('sidebar', [function() {
        return {

            controller: 'SidebarController',
            restrict: 'E',
            templateUrl: 'app/components/sidebar/sidebar.html',
            replace: true
        };
    }]);