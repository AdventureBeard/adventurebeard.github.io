angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.filters',
    'angularUtils.directives.dirPagination'
])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/components/postlist/postlist.html',
            controller: 'PostListController'

        }).when('/post/:id', {
            templateUrl: 'app/components/postviewer/singlepost.html',
            controller: 'SinglePostController'

        }).when('/page/:id', {
            templateUrl: 'app/components/pageviewer/page.html',
            controller: 'PageController'

        }).otherwise({
            redirectTo: '/'

        })
    }]);