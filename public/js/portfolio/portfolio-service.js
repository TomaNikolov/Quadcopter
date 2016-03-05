(function () {
    'use strict';

    function portfolio($q, data) {

        function getImages() {
            return data.get('image')
        }

        function getVideos() {
            return data.get('video')
        }

        return {
            getImages: getImages,
            getVideos: getVideos
        }
    }

    angular.module('quadCopter.services')
        .factory('portfolio', ['$q', 'data', portfolio])
}());
