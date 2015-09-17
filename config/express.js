'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

module.exports = function (app) {

    app.use(busboy());

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(bodyParser.json());

    app.use(express.static('public'));

    app.use(function (req, res, next) {
        //  res.header('Content-Type, Accept, X-Access-Token');
        next();
    })
};
