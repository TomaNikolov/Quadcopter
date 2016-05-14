'use stric'

var express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

require('./server/config/express')(app);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

var server = app.listen(config.port, function () {
  console.log('server is running at port ' + config.port);
});

server.timeout = 60 * 60 * 60 * 10;
