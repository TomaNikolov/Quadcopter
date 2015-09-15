'use strict'

var controllers = require('../controllers');

module.exports = function(app){
  app.post('/api/users', controllers.users.create);
  app.post('/api/video', controllers.videos.create);
  app.get('/api/video', controllers.videos.getAll);
  app.get('/api/admin', controllers.admin.init);
}
