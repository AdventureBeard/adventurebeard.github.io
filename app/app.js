angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.services',
    'app.filters',
    'angularUtils.directives.dirPagination',
    'ngMaterial',
    'ngSanitize',
    'ngAnimate'
])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/components/postlist/postlist.html',
            controller: 'PostListController'

        }).when('/post/:id', {
            templateUrl: 'app/components/postviewer/singlepost.html',
            controller: 'SinglePostController'

        }).when('/page/:id', {
            templateUrl: 'app/components/pageviewer/page.html',
            controller: 'PageController'

        }).when('/editor', {
            templateUrl: 'app/components/posteditor/posteditor.html',
            controller: 'PostEditorController'

        }).otherwise({
            redirectTo: '/'

        })
    }])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('blue')
            .warnPalette('orange')

    });



angular.module('app.controllers', ['app.directives', 'ngMaterial']);
angular.module('app.directives', []);
angular.module('app.filters', ['app.directives']);
angular.module('app.services', []);



