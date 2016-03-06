'use strict';

var mongoose = require('mongoose');
var encryption = require('../../utils/encryption');

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        accessToken: {type: String},
        salt: String,
        hashPass: {type: String, required: true}
    });

    userSchema.method({
        authenticate: function (password) {
            return (encryption.generateHashedPassword(this.salt, password) === this.hashPass)
        }
    });

    mongoose.model('User', userSchema);
};
