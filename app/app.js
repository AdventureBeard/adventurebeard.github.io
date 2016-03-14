angular.module('app', [
    'ngRoute',
    'app.controllers',
    'app.services',
    'app.filters',
    'angularUtils.directives.dirDisqus',
    'ngMaterial',
    'ngSanitize',
    'ngAnimate',
    'ngStorage'
])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/', {
            templateUrl: 'app/components/postlist/postlist.html',
            controller: 'PostListController',
            access: { requiredLogin: false }

        }).when('/post/:id', {
            templateUrl: 'app/components/postviewer/singlepost.html',
            controller: 'SinglePostController',
            access: { requiredLogin: false }

        }).when('/editor', {
            templateUrl: 'app/components/posteditor/posteditor.html',
            controller: 'PostEditorController',
            access: { requiredLogin: true }

        }).when('/login', {
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginController',
            access: {requiredLogin: false}

        }).when('/soundcloud', {
            templateUrl: 'app/components/pages/soundcloud/soundcloud.html',
            controller: 'SoundcloudController',
            access: {requiredLogin: false}

        }).when('/resume', {
            templateUrl: 'app/components/pages/resume/resume.html',
            controller: 'ResumeController',
            access: {requiredLogin: false}

        }).when('/about', {
            templateUrl: 'app/components/pages/about/about.html',
            controller: 'AboutController',
            access: {requiredLogin: false}

        }).otherwise({
            redirectTo: '/'

        });
    }])

    .config(function ($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('blue')
            .warnPalette('orange');

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', 'AuthService', function($q, $location, $localStorage) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    })

    .run(function ($rootScope, $location, AuthService) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute.access.requiredLogin && !AuthService.isLoggedIn) {
                $location.path("/login");
            }
        });

    });



angular.module('app.controllers', ['app.directives', 'ngMaterial']);
angular.module('app.directives', []);
angular.module('app.filters', ['app.directives']);
angular.module('app.services', []);



