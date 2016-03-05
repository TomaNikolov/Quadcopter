
(function () {
    'use strict';

    function YoutubeController($routeParams, $sce) {
        var vm = this;
        var id = $routeParams.id;

        vm.getUrl = function(){
            var url = "https://www.youtube.com/embed/" + id;
            return  $sce.trustAsResourceUrl(url);
        }
    }

    angular.module('quadCopter.controllers')
        .controller('YoutubeController', ['$routeParams', '$sce', YoutubeController])
}());
