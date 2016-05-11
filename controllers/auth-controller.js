'use strict';

var users = require('../data/users');
var randomToken = require('random-token');

module.exports = {
    login: function (req, res) {
        var user = req.body;

        if (!user.username) {
            res.status(401)
                .json({ success: false, reason: 'Username is reqired!' });

            return;
        }

        if (!user.password) {
            res.status(401)
                .json({ success: false, reason: 'Password is required!' });

            return;
        }

        users.findByUserName(user.username)
            .then(function (dbUser) {
                console.log(dbUser);
                if (!(dbUser.authenticate(user.password))) {
                    res.json({ success: false, reason: 'Invalid Password' });

                    return;
                }

                if (!dbUser.token) {
                    dbUser.accessToken = randomToken(80);
                    dbUser.save();
                }

                res.json({
                    success: true,
                    user: {
                        username: dbUser.username,
                        accessToken: dbUser.accessToken
                    }
                });

            })
            .catch(function (err) {
                res.status(401)
                    .json({ success: false, reason: err });
            });
    },
    logout: function (req, res) {
        var user = req.user;

        users.findByUserName(user.username)
            .then(function (dbUser) {
                dbUser.accessToken = '';
                dbUser.save();
                res.json({ success: true });
            })
            .catch(function (err) {
                res.status(401)
                    .json({ success: false, reason: err });
            })
    },
    authenticate: function (req, res, next) {
        var token = req.headers['x-auth-key'];

        users.findByToken(token)
            .then(function (dbUser) {
                req.user = dbUser;
                next();
            })
            .catch(function (err) {
                res.status(401)
                    .json({ success: false, reason: err });
            });
    },
    adminAuth: function (req, res, next) {
        var user = req.user;

        if (user.username !== 'admin') {
            res.status(401)
                .json({ success: false, reason: 'Unauthorised!' });

            return;
        }

        next();
    }
}
