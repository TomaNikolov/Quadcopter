'use strict'

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.urlencoded({extended:true}))

  app.use(bodyParser.json());

  app.use(express.static('public'));

  app.use(function(req, res, next){
  //  res.header('Content-Type, Accept, X-Access-Token');
    next();
  })
}
