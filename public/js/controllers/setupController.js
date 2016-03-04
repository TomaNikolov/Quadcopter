var setUpController = (function () {
    function init(context) {

        data.user.setUp()
            .then(function (template) {
                //  console.log(template);
                context.$element()
                    .html(template);
            })
            .catch(function (err) {

            });
    }

    return {
        init: init
    };
}());

(function () {
    'use strict';

    function HomeController() {
        var vm = this;

    }

    angular.module('quadCopter.controllers')
        .controller('HomeController', [ HomeController])
}());
