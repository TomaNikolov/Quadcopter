var usersController = (function () {
    $('#btn-login').on('click', function () {
        var user = {
            username: $('#tb-username').val(),
            password: $('#tb-pass').val()
        };
        console.log(user);
        data.user.login(user)
            .then(function (user) {
                console.log(user);
            })
    });
}());
(function () {
    'use strict';

    function UsersController() {
        var vm = this;
    }

    angular.module('quadCopter.controllers')
        .controller('UsersController', [ UsersController])
}());
