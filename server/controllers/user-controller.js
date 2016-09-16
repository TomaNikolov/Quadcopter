'use strict';

let path = require('path');
let users = require('../data/users');
let paginate = require('../utils/paginate');
let fileSystem = require('../utils/file-system');
let constatants = require('../common/constants');

module.exports = {
    create: function (req, res) {
        let user = req.body;
        
        users.create(user)
            .then((dbUser) => {
               var folderPath =  path.normalize(__dirname + constatants.STORAGE_PATH + dbUser.username);
               return fileSystem.mkdir(folderPath);
            })
            .then(() => {
                 res.redirect('/users');
            })
            .catch((err) => {
                console.log(err)
               res.redirect('/users')
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
        users.getAll()
            .then((resUsers) => {
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
