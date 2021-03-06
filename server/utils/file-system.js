'use strict'

let fs = require('fs');
let path = require('path');
let rimraf = require('rimraf');

module.exports = {
    rename: function () {

    },

    deleteFile: function (path) {
        console.log('file: ', path)
        return new Promise((resolve, reject) => {
            rimraf(path,  (err, _) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(_);
            });
        });
    },

    mkdir: function (path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path , (err, folder) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(folder);
            });
        });
    }
};