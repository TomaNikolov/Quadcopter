'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let busboy = require('connect-busboy');
let passport = require('passport');

module.exports = function (app, config) {

    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/views');
    
    app.use(cookieParser());

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        secret: 'magic unicorns',
        resave: true,
        saveUninitialized: true
    }));

    app.use(busboy({
        immediate: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('public'));

    // CUSTOM MIDDLEWARE
    app.use(function (req, res, next) {
        let msg;

        if (req.session.error) {
            msg = req.session.error;
            req.session.error = undefined;
            res.locals.errorMessage = msg;
        }

        if (req.session.success) {
            msg = req.session.success;

            console.log(msg);

            req.session.success = undefined;
            res.locals.successMessage = msg;
        }

        next();
    });

    app.use(function (req, res, next) {
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });
};