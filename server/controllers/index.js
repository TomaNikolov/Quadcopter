'use strict';

let userController = require('./user-controller');
let videoController = require('./video-controller');
let adminController = require('./admin-controller');
let imageController = require('./image-controller');
let fileServerController = require('./file-server-controller');
let uploadController = require('./upload-controller')

module.exports = {
    users: userController,
    videos: videoController,
    admin: adminController,
    image: imageController,
    fileServer: fileServerController,
    upload: uploadController
};
