'use strict';

let mongoose = require('mongoose');

module.exports.init = function () {
    let videoSchema = mongoose.Schema({
        name: {type: String, required: true, unique: true}
    });

    mongoose.model('Video', videoSchema);
};
