'use strict';

var users = require('../data/users');

module.exports = {
    create: function (req, res) {
        var user = req.body;

        if (!user.username) {
            res
                .status(401)
                .json({success: false, reason: 'Username is required'});

            return;
        }

        if (!user.password) {
            res
                .status(401)
                .json({success: false, reason: 'Password is required'});

            return;
        }

        //TODO: hash Password
        user.accessToken = '';

        users.create(user)
            .then(function (dbUser) {
                res.json({
                    success: true,
                    user: {
                        username: dbUser.username,
                        id: dbUser._id
                    }
                });
            })
            .catch(function (err) {
                res.json({success: false, reason: err});
            });
    }
};
