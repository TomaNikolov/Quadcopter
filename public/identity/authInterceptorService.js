
(function () {
    'use strict';

    function authInterceptorService($q, $location, localStorageService) {
        return {
            request: function (request) {

                return request;
            },

            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/home');
                }
                return $q.reject(response);
            }
        }
    }

    angular.module('quadCopter.services')
        .factory('authInterceptorService', ['$q', '$location', 'localStorageService', authInterceptorService])
} ());