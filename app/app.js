angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.filters',
    'angularUtils.directives.dirPagination'
])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'views/post.html',
            controller: 'PostListController'

        }).when('/post/:id', {
            templateUrl: 'views/singlepost.html',
            controller: 'SinglePostController'

        }).when('/page/:id', {
            templateUrl: 'views/page.html',
            controller: 'PageController'

        }).otherwise({
            redirectTo: '/'

        })
    }]);