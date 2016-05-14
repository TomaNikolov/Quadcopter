'use strict';

var mongoose = require('mongoose');

module.exports.init = function () {
    var videoSchema = mongoose.Schema({
        name: {type: String, required: true, unique: true}
    });

    mongoose.model('Video', videoSchema);
};
