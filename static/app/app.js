'use strict';


// Declare app level module which depends on filters, and services
var pasteApp = angular.module('pasteApp', ['ui.router', 'hljs'])
    .config(
    ['$urlRouterProvider', '$stateProvider', 'routes', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, routes, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    
    
    console.log('config mode');
        //$locationProvider.html5Mode(true);
        //make urls case insensitive
        $urlRouterProvider.rule(function ($injector, $location) {
            //what this function returns will be set as the $location.url
            var path = $location.path(), normalized = path.toLowerCase();
            if (path != normalized) {
                //instead of returning a new url string, I'll just change the $location.path directly so 
                //I don't have to worry about constructing a new url string and so a new state change is not triggered
                $location.replace().path(normalized);
            }
            // because we've returned nothing, no state change occurs
        });

        $urlRouterProvider.otherwise('/');
        var allRoutes = routes.routes;
        for (var i in allRoutes) {
            var route = allRoutes[i];
            $stateProvider.state(route);
        }

    }]
)
.run(['$rootScope', '$state', '$q', 'routes',
    function ($rootScope, $state, $q, routes) {
    console.log('run mode');
        var CheckRedirects = function(currentStateName) {
            var redirects = routes.redirects;
            return redirects[currentStateName];
        };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //apply custom redirects (this replaces $urlRouterProvider.when)
        if (CheckRedirects(toState.name)) {
            event.preventDefault();
            $state.go(CheckRedirects(toState.name), toParams);
        }
    });
}]);

