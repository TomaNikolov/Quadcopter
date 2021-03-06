'use strict';

let controllers = require('../controllers'),
    auth = require('./auth');

module.exports = function (app) {
    //API
    app.post('/api/login', auth.login);
    app.put('/api/logout', auth.logout);
    app.get('/api/isLoggedin', auth.isAuthenticated, controllers.users.isLoggedin);

    app.get('/api/video', controllers.videos.getAll);
    app.get('/api/image', controllers.image.getAll);

    app.get('/api/fileserver/downloadAll', controllers.fileServer.downloadAll);
    app.get('/api/fileserver/:fileName', controllers.fileServer.fileDownload);
    app.get('/api/fileserver/', controllers.fileServer.getFiles);
    app.post('/api/getDirTree', controllers.fileServer.getDirTree);
    app.post('/api/getFiles', controllers.fileServer.getCurrentDir);
    app.post('/api/deleteFile', controllers.fileServer.deleteFile);
    app.post('/api/createDir', controllers.fileServer.mkdir);
    app.post('/api/upload', controllers.upload.fileUpload);

    //Admin
    app.post('/videos', auth.isAuthenticated, auth.isAdmin, controllers.videos.create);
    app.get('/videos', auth.isAuthenticated, auth.isAdmin, controllers.videos.getVideo);

    // app.post('/images', auth.isAuthenticated, auth.isAdmin, controllers.image.create);
    // app.get('/images', auth.isAuthenticated, auth.isAdmin, controllers.image.getImage);

    app.post('/images', controllers.image.create);
    app.get('/images', controllers.image.getImage);

    app.get('/users', controllers.users.getUsers);
    app.get('/register', controllers.users.register);
    app.post('/register', controllers.users.create);
     
    app.get('/files', controllers.fileServer.getView);

  

    //app.get('/api/admin', auth.isAuthenticated, auth.isAdmin, controllers.admin.init);
    app.get('/admin', controllers.admin.init);
};
