'use strict';

let mongoose = require('mongoose');
let encryption = require('../../utils/encryption');

module.exports.init = function () {
    let userSchema = mongoose.Schema({
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
