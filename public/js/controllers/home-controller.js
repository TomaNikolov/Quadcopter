//var HomeController = (function () {
//    function init(context) {
//
//        templateGenerator
//            .get('home')
//            .then(function (template) {
//                context.$element()
//                    .html(template());
//            })
//            .then(function () {
//                $('[data-spy="responsive-slider"]').responsiveSlider();
//            });
//    }
//
//    return {
//        init: init
//    };
//}());

(function () {
    'use strict';

    function HomeController() {
        var vm = this;

    }

    angular.module('quadCopter.controllers')
        .controller('HomeController', [ HomeController])
}());
