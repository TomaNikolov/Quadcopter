'use strict';

var userController = require('./user-controller');
var videoController = require('./video-controller');
var adminController = require('./admin-controller');
var imageController = require('./image-controller');
var fileServerController = require('./file-server-controller');

module.exports = {
    users: userController,
    videos: videoController,
    admin: adminController,
    image: imageController,
    fileServer: fileServerController
};
