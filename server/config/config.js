'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname +'./..');

module.exports = {
  development:{
    rootPath : rootPath,
    port: 3030,
    dbConnection: 'mongodb://tomasaa:quadcopter@ds033828.mongolab.com:33828/quadcopter'
  },
  production:{
    rootPath : rootPath,
    port: process.env.Port ||3030,
    dbConnection: 'mongodb://tomasaa:quadcopter@ds033828.mongolab.com:33828/quadcopter'
  }
};
