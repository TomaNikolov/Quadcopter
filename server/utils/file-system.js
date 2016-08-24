'use strict'

let fs = require('fs');
let path = require('path');

module.exports = {
    rename: function () {

    },

    delete: function (file) {
        return new Promise ((resolve, reject) => {
            fs.unlink('/tmp/hello', (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    },

    mkdir: function (path) {
       fs.mkdir(path , (err, folder) => {
            if (err) {
                reject(err);
            }

            resolve(folder);
        });
    }
};