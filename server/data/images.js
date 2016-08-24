'use strict';

let Image = require('mongoose').model('Image');
let Promise = require('bluebird');

module.exports = {
    create: function (image) {
        let promise = new Promise(function (resolve, reject) {
            Image.create(image, function (err, dbImage) {
                if (err) {
                    reject(err);
                }

                if (!dbImage) {
                    reject('Image could not be saved!')
                }P

                resolve(dbImage)
            });
        });

        return promise;
    },
    
    getAll: function () {
        let promise = new Promise(function (resolve, reject) {
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
