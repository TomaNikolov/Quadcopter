'use strict';

var controllers = require('../controllers'),
    auth = require('./auth');

module.exports = function (app) {
    app.post('/api/register', controllers.users.create);
    app.post('/api/login', auth.login);
    app.put('/api/logout', auth.logout);
    app.get('/api/isLoggedin', auth.isAuthenticated, controllers.users.isLoggedin);
    app.post('/api/video', auth.isAuthenticated, auth.isAdmin, controllers.videos.create);
    app.post('/api/image', auth.isAuthenticated, auth.isAdmin, controllers.image.create);
    app.get('/api/admin', auth.isAuthenticated, auth.isAdmin, controllers.admin.init);
    app.get('/api/video', controllers.videos.getAll);
    app.get('/api/image', controllers.image.getAll);

    app.get('/api/fileserver/downloadAll', controllers.fileServer.downloadAll);
    app.get('/api/fileserver/:fileName', controllers.fileServer.fileDownload);
    app.get('/api/fileserver/', controllers.fileServer.getFiles);
};
