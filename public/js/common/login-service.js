(function () {
    'use strict';

    function loginService(data) {

        function login(user) {
            return data.post('login', user);
        }

        return {
            login: login
        };
    }

    angular.module('quadCopter.services')
        .factory('loginService', ['data', loginService]);
} ());