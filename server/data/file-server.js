'use strict';
var fs = require('fs');
var Promise = require('bluebird');
var archiver = require('archiver');
var CONSTANTS = require('../common/constants');

module.exports = {
    getFile: function (dirName) {
        var folderPath = CONSTANTS.FILE_PATH + dirName;
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
        var folderPath = CONSTANTS.FILE_PATH + dirName;
        return new Promise(function (resolve, reject) {
            var zipfileName = folderPath + '.zip';
            var output = fs.createWriteStream(zipfileName);
            var archive = archiver('zip');

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