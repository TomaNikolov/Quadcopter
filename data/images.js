'use strict';

var Image = require('mongoose').model('Image');
var Promise = require('bluebird');

module.exports = {
    create: function (image) {
        var promise = new Promise(function (resolve, reject) {
            Image.create(image, function (err, dbImage) {
                if (err) {
                    reject(err);
                }

                if (!dbImage) {
                    reject('Image could not be saved!')
                }

                resolve(dbImage)
            });
        });

        return promise;
    },
    getAll: function () {
        var promise = new Promise(function (resolve, reject) {
            Image.find({}, function (err, dbImages) {
                if (err) {
                    reject(err);
                }

                if (!dbImages) {
                    reject('There is no images!')
                }

                resolve(dbImages);
            });
        });

        return promise;
    }
}
