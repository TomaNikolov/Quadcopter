'use strict';

var users = require('../data/users');
var paginate = require('../utils/paginate');

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
                res.json({ success: false, reason: err });
            });
    },
    
    register: function (req, res){
        res.render("users/register");
    },
    
    isLoggedin: function (req, res) {
        var user = req.user;

        res.json({
            success: true,
            user: {
                username: user.username,
            }
        });
    },

    getUsers: function (req, res) {
        var curentPage = req.query.page || 1;
        var pageSize = 10;
        console.log(curentPage)
        users.getAll()
            .then(function (resUsers) {
                var pegination = paginate.getPaginate(curentPage, '/users', resUsers, pageSize);
                var data = paginate.getPageData(resUsers, pageSize, curentPage);
                
                res.render('users/users',
                    {
                        users: data,
                        paginate: pegination
                    });
            });
    }
};
