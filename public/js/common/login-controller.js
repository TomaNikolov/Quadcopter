(function () {
    'use strict';

    function LoginController(loginService) {
        var vm = this;
            vm. user = {
                username: '',
                password: ''
            };
            
        vm.login = function (){
            console.log(vm.user);
            loginService.login(vm.user)
            .then(function(resData){
                console.log(resData);
            })
        }
    }

    angular.module('quadCopter.controllers')
        .controller('LoginController', ['loginService', LoginController])
}());
