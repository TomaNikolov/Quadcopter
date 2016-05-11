(function () {
    'use strict';

    function config($routeProvider) {

        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        $routeProvider
            .when('/', {
                templateUrl: PARTIALS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/contacts', {
                templateUrl: PARTIALS_PREFIX + 'contacts/contacts.html',
                controller: 'ContactsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/portfolio', {
                templateUrl: PARTIALS_PREFIX + 'portfolio/portfolio.html',
                controller: 'PortfolioController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/aboutus', {
                templateUrl: PARTIALS_PREFIX + 'aboutus/aboutus.html',
                controller: 'AboutUsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/video/:id', {
                templateUrl: PARTIALS_PREFIX + 'portfolio/video.html',
                controller: 'YoutubeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/file-server', {
                templateUrl: PARTIALS_PREFIX + 'file-server/file-server.html',
                controller: 'FileServerController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .otherwise({redirectTo: '/'});
    }

    angular.module('quadCopter.services', []);
    angular.module('quadCopter.directives', []);
    angular.module('quadCopter.controllers', ['quadCopter.services']);
    angular.module('quadCopter', ['ngRoute', 'quadCopter.controllers', 'quadCopter.directives'])
        .config(['$routeProvider', config]);
}());
