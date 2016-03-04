
(function () {
    'use strict';

    function YoutubeController($routeParams) {
        var vm = this;
        console.log($routeParams.id);
        vm.id = $routeParams.id;

        vm.getIframeSrc = function(id){
            return "https://www.youtube.com/embed/u3B0lRzlWGg" ;
        }
    }

    angular.module('quadCopter.controllers')
        .controller('YoutubeController', ['$routeParams', YoutubeController])
}());
