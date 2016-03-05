(function () {
    'use strict';

    function pretty($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'views/directives/pretty-photo.html',
            scope: {
                images: '='
            },
            link: function (scope, element, attrs) {
                $timeout(function () {
                    $("[rel^='prettyPhoto']").prettyPhoto({deeplinking: false, social_tools: false});
                }, 200);
            }
        }
    }

    angular.module('quadCopter.directives')
        .directive('pretty', ['$timeout', pretty])
}());
