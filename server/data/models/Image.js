'use strict';

let mongoose = require('mongoose');

module.exports.init = function () {
    let imageSchema = mongoose.Schema({
        fileName: {type: String, required: true, unique: true},
        title: {type: String},
        date: {type: String}
    });

    mongoose.model('Image', imageSchema);
};
