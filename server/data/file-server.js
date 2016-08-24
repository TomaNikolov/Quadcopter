'use strict';
let fs = require('fs');
let Promise = require('bluebird');
let archiver = require('archiver');
let CONSTANTS = require('../common/constants');

module.exports = {
    getFile: function (dirName) {
        let folderPath = CONSTANTS.FILE_PATH + dirName;
        console.log(folderPath)
        return new Promise(function (resolve, reject) {
            fs.stat(folderPath, function (err) {
                if (err) {
                    reject('Folder doesn\'t exist')
                    return;
                }

                fs.readdir(folderPath, function (err, files) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(files);
                });
            });
        });
    },

    zipFile: function (dirName) {
        let folderPath = CONSTANTS.FILE_PATH + dirName;
        return new Promise(function (resolve, reject) {
            let zipfileName = folderPath + '.zip';
            let output = fs.createWriteStream(zipfileName);
            let archive = archiver('zip');

            output.on('close', function () {
                resolve(zipfileName);
            });

            archive.on('error', function (err) {
                reject(err);
            });

            archive.pipe(output);

            archive.bulk([
                { expand: true, cwd: folderPath , src: ['**'] }
            ]);

            archive.finalize();
        });
    },

    deleteZip: function (zipfilePath) {
        return new Promise(function (resolve, reject) {
            fs.stat(zipfilePath, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                fs.unlink(zipfilePath, function (err) {
                    resolve();
                });
            });
        });
    }
};