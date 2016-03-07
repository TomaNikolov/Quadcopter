'use strict';

var users = require('../data/users');

module.exports = {
    create: function (req, res) {
        var user = req.body;

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
