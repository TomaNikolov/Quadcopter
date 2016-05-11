(function () {
    'use strict';

    function FileServerController(fileServerService) {
        var vm = this;
        
        fileServerService.getAllFiles()
        .then(function (resFiles) {
            vm.files = resFiles.result;
        })
    }

    angular.module('quadCopter.controllers')
        .controller('FileServerController', ['fileServerService', FileServerController])
}());