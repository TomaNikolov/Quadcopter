'use strict';

var fileServer = require('../data/file-server');
var CONSTANTS = require('../common/constants');
var path = require('path');
var fs = require('fs');

var FILE_PATH = '../Quadcopter/file-server/';

function getDirName(req) {
    //  var name = res.user.username

    //just for the test
    return 'toma';
}

module.exports = {
    getFiles: function (req, res) {
        // TODO user validation
        // dir name is the name of the user

        var directoryName = getDirName(req);
          console.log('@@@@@@@@files:' + (__dirname + STORAGE_PATH + directoryName))
        fileServer.getFile(directoryName)
            .then(function (files) {
                res.json({ success: false, result: files })
            })
            .catch(function (err) {
                res.json({ success: false, reason: err })
            })
    },

    fileDownload: function (req, res) {
        var dirName = getDirName(req);
        var fileName = req.params.fileName;

        res.download(CONSTANTS.FILE_PATH + dirName + '/' + fileName)
    },

    downloadAll: function (req, res) {
        var dirName = getDirName(req);

        fileServer.zipFile(dirName)
            .then(function (zipFilePath) {
                res.download(zipFilePath, 'some.zip', function (err) {
                    //  fileServer.deleteZip(zipFilePath)
                });
            })
            .catch(function (err) {
                res.json({ success: false, reason: err })
            })
    },

    getView: function (req, res) {
        res.render('files/files');
    },

    getDirList: function (req, res) {
        var dir = req.body.dir;
        let storagePath = getStoragePath(req);
        var r = '<ul class="jqueryFileTree" style="display: none;">';
        try {
            r = '<ul class="jqueryFileTree" style="display: none;">';
            console.log('@@@@@@@@dir:' + (__dirname + storagePath + dir))
            var files = fs.readdirSync(path.normalize(__dirname + storagePath + dir));
            files.forEach(function (f) {
                var ff = dir + f;
                  console.log(f)
                var stats = fs.statSync(path.normalize(__dirname + storagePath + ff));
                if (stats.isDirectory()) {
                    r += '<li class="directory collapsed"><a href="#" rel="' + ff + '/">' + f + '</a></li>';
                } else {
                    var e = f.split('.')[1];
                  console.log(e)
                    r += '<li class="file ext_' + e + '"><a href="#" rel=' + ff + '>' + f + '</a></li>';
                }
            });
            r += '</ul>';
        } catch (e) {
            r += 'Could not load directory: ' + dir;
            r += '</ul>';
        }
        res.send(r)
    },

    getCurrentDir: function (req, res) {
        var dir = req.body.dir;
        var data = [];
        let storagePath = getStoragePath(req);
        console.log('!!!!!!!!!!curDir:' +  path.normalize(__dirname + storagePath + dir))
        var files = fs.readdirSync(path.normalize(__dirname + storagePath + dir));
        console.log(files);
        files.forEach(function (f) {
            var ff = dir + f;
            var currentFile = {};
            currentFile.name = f
              var stats = fs.statSync(path.normalize(__dirname + storagePath + ff));
            if (stats.isDirectory()) {
                currentFile.type = 'folder';
            currentFile.path = ff + '/';
                
            } else {
                var e = f.split('.')[1];
                currentFile.type = e;
            currentFile.path = ff;
                
            }
            data.push(currentFile)
        });

        res.json({ result: data })
    },
};

function getStoragePath (req) {
    // if admin return storage path 
    // if(true){
    //     return CONSTANTS.STORAGE_PATH 
    // }

    //return path to user directory 
    // var name = req.user.name
    return `${CONSTANTS.STORAGE_PATH}toma/`;
}