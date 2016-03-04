
(function () {
    'use strict';

    function YoutubeController($routeParams) {
        var vm = this;

        vm.id = $routeParams.Id;
    }

    angular.module('quadCopter.controllers')
        .controller('YoutubeController', ['$routeParams', YoutubeController])
}());
