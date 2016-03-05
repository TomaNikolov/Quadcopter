(function () {
    'use strict';

    function data($http, $q) {

        var BASE_URL = 'api/';

        function get(url, queryParams) {
            var deferred = $q.defer();

            $http.get(BASE_URL + url, {params: queryParams})
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function post(url, postData) {
            var deferred = $q.defer();

            $http.post(BASE_URL + url, postData)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function put(url, postData) {
            var deferred = $q.defer();

            $http.put(BASE_URL + url, postData)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            get: get,
            post: post,
            put: put
        };
    }

    angular.module('quadCopter.services')
        .factory('data', ['$http', '$q', data]);
}());
