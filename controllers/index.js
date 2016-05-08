'use strict';

var userController = require('./user-controller');
var videoController = require('./video-controller');
var adminController = require('./admin-controller');
var authController = require('./auth-controller');
var imageController = require('./image-controller');
var fileServerController = require('./file-server-controller');

console.log(fileServerController)

module.exports = {
    users: userController,
    videos: videoController,
    admin: adminController,
    auth: authController,
    image: imageController,
    fileServer: fileServerController
};
