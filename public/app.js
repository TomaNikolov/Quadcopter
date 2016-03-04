//var sammy = Sammy('#content', function () {
//
//  this.get('#/', function (context) {
//    removeActiveclassFromHeader();
//    $('#home').addClass('active');
//    homeController.init(context)
//  })
//
//  this.get('#/contacts', function (context) {
//    removeActiveclassFromHeader();
//    $('#contacts').addClass('active');
//    contactsController.init(context)
//  });
//
//  this.get('#/portfolio', function (context) {
//    removeActiveclassFromHeader();
//    $('#portfolio').addClass('active');
//    portfolioController.init(context)
//  });
//
//  this.get('#/aboutus', function (context) {
//    removeActiveclassFromHeader();
//    $('#aboutus').addClass('active');
//    aboutusController.init(context)
//  });
//
//  this.get('#/video', youtubeController.init);
//
//  this.get('#/setup', setUpController.init);
//
//
//  this.get('', function () {
//    console.log(all)
//  });
//});
//
//sammy.run('#/');
//
//function removeActiveclassFromHeader() {
//  var $active = $('.nav, .navbar-nav, .navbar-right, .active');
//  $active.removeClass('active');
//}

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
                //  resolve: routeResolvers.authenticationRequired
            })
            .otherwise({ redirectTo: '/' });
    }

    angular.module('quadCopter.services', []);
  //  angular.module('quadCopter.directives', []);
  //  angular.module('quadCopter.filters', []);
    angular.module('quadCopter.controllers', ['quadCopter.services']);
    angular.module('quadCopter', ['ngRoute', 'quadCopter.controllers']).
        config(['$routeProvider', config]);
}());
