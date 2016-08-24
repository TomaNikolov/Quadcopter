'use strict';

let users = require('../data/users');
let paginate = require('../utils/paginate');

module.exports = {
    create: function (req, res) {
        let user = req.body;

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
        let user = req.user;

        res.json({
            success: true,
            user: {
                username: user.username,
            }
        });
    },

    getUsers: function (req, res) {
        let curentPage = req.query.page || 1;
        let pageSize = 10;
        console.log(curentPage)
        users.getAll()
            .then(function (resUsers) {
                let pegination = paginate.getPaginate(curentPage, '/users', resUsers, pageSize);
                let data = paginate.getPageData(resUsers, pageSize, curentPage);
                
                res.render('users/users',
                    {
                        users: data,
                        paginate: pegination
                    });
            });
    }
};
