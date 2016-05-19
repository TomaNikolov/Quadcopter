var User = require('mongoose').model('User');
var Promise = require('bluebird');
var encryption = require('../utils/encryption');

'use strict';

module.exports = {
    create: function (user) {
        var promise = new Promise(function (resolve, reject) {

            if (!user.username) {
                reject('Username is required')
            }

            if (!user.password) {

                reject('Password is required')
            }

            user.accessToken = '';
            user.salt = encryption.generateSalt();
            user.hashPass = encryption.generateHashedPassword(user.salt, user.password);

            User.create(user, function (err, dbUser) {
                if (err) {
                    if (err.code === 11000) {
                        reject('User name has already been taken!')
                    } else {
                        reject(err);
                    }
                }

                if (!dbUser) {
                    reject('user could not be saved in database!')
                }

                resolve(dbUser);
            });
        });

        return promise;
    },
    findByUserName: function (username) {
        var promise = new Promise(function (resolve, reject) {
            User.findOne({username: username}).exec(function (err, dbUser) {

                if (err) {
                    reject(err);
                }

                if (!dbUser) {
                    reject('Unauthorised');
                }

                resolve(dbUser);
            });
        });

        return promise;
    },
    findByToken: function (token) {
        var promise = new Promise(function (resolve, reject) {
            User.findOne({accessToken: token}).exec(function (err, dbUser) {
                if (err) {
                    reject(err);
                }

                if (!dbUser) {
                    reject('Unauthorised');
                }

                resolve(dbUser);
            });
        });

        return promise;
    },
    
    getAll: function (params) {
         var promise = new Promise(function (resolve, reject) {
            User.find(function (err, dbUsers) {
                if (err) {
                    reject(err);
                }

                if (!dbUsers) {
                    reject('There is no users!');
                }

                resolve(dbUsers);
            });
        });

        return promise;
    }
};
