'use stric'

var express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

require('./config/express')(app);
require('./config/mongoose')(config);
require('./config/routes')(app);

var server = app.listen(config.port, function () {
  console.log('server is running at port ' + config.port);
});

server.timeout = 60 * 60 * 60 * 10;
