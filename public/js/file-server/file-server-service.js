(function () {
    'use strict';

    function fileServerService(data) {

        function getAllFiles() {
            return data.get('fileserver');
        }

        return {
            getAllFiles: getAllFiles
        };
    }

    angular.module('quadCopter.services')
        .factory('fileServerService', ['data', fileServerService]);
} ());