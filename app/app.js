angular.module('app', [
    'ngRoute',
    'app.controllers',
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

        }).otherwise({
            redirectTo: '/'

        })
    }])

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')

    })

    .run(function () {
        var colors = ['RdPu', 'GnBu', 'BuPu', 'PuBu', 'PuRd', 'BuGn', 'Purples'];  // Color palettes to be randomly selected by Trianglify.
        var trianglify = function () {
            var canvas = document.getElementById('imageView');
            canvas.width = window.outerHeight;
            canvas.height = window.innerWidth
            var pattern = Trianglify({
                cell_size: 75,
                variance: Math.random(),
                height: window.innerHeight + 100,
                width: window.innerWidth,
                x_colors: colors[Math.floor(Math.random() * colors.length)],
                y_colors: colors[Math.floor(Math.random() * colors.length)]
            });
            pattern.canvas(canvas);
        };


        trianglify();
    });