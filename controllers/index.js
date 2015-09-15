'use strict'

var userController = require('./user-controller');
var videoController = require('./video-controller');
var adminController = require('./admin-controller');

module.exports = {
  users : userController,
  videos: videoController,
  admin: adminController
}
