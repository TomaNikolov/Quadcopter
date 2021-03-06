'use strict';

let mongoose = require('mongoose');
let models = require('../data/models');

module.exports = function (config) {
    mongoose.connect(config.dbConnection);
    let db = mongoose.connection;

    db.on('error', function (err) {
        db.on('error', console.error('Connection error ' + err));
    });

    db.once('open', function () {
        console.info('MongoDB is running...');
    });

    models.UserModel.init();
    models.VideoModel.init();
    models.ImageModel.init();
};
