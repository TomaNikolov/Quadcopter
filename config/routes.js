'use strict';

var controllers = require('../controllers');

module.exports = function (app) {
    app.post('/api/register', controllers.users.create);
    app.put('/api/login', controllers.auth.login);
    app.put('/api/logout', controllers.auth.logout);
    app.post('/api/video', controllers.auth.authenticate, controllers.auth.adminAuth, controllers.videos.create);
    app.post('/api/image', controllers.auth.authenticate, controllers.auth.adminAuth, controllers.image.create);
    app.get('/api/admin', controllers.auth.authenticate, controllers.auth.adminAuth, controllers.admin.init);
    app.get('/api/video', controllers.videos.getAll);
    app.get('/api/image', controllers.image.getAll);
    
    app.get('/api/fileserver/downloadAll', controllers.fileServer.downloadAll);
    app.get('/api/fileserver/:fileName', controllers.fileServer.fileDownload);
    app.get('/api/fileserver/', controllers.fileServer.getFiles);
};
