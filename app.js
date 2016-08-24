'use strict';

let express = require('express');

let app = express();
let env = process.env.NODE_ENV || 'development';
let config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

let server = app.listen(config.port, function () {
  console.log('server is running at port ' + config.port);
});

server.timeout = 60 * 60 * 60 * 10;
