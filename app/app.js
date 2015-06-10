angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            template: 'Home'
        }).otherwise({
            redirectTo: '/'
        })
    }]);