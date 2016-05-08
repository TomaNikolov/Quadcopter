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
    
    app.get('/api/fileserver/:directory', controllers.fileServer.getFiles);
};
