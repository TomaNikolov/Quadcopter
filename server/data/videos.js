'use strict'

let Video = require('mongoose').model('Video');
let Promise = require('bluebird');

module.exports = {
    create: function (video) {
        console.log(video)
        let promise = new Promise(function (resolve, reject) {
            Video.create(video, function (err, dbVideo) {
                if (err) {
                    reject(err);
                }

                if (!dbVideo) {
                    reject('Video could not be saved in database!')
                }

                resolve(dbVideo);
            });
        });

        return promise;
    },
    
    getAll: function () {
        let promise = new Promise(function (resolve, reject) {
            Video.find({}, function (err, dbVideos) {
                if (err) {
                    reject(err);
                }

                if (!dbVideos) {
                    reject('There is no video!')
                }

                resolve(dbVideos);
            })
        });

        return promise;
    }
}
