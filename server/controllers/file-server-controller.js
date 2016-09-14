'use strict';

let fileServer = require('../data/file-server');
let CONSTANTS = require('../common/constants');
let path = require('path');
let fs = require('fs');
let fileSystem = require('../utils/file-system');
let FILE_PATH = '../Quadcopter/file-server/';

module.exports = {
    getFiles: function (req, res) {
        // TODO user validation
        // dir name is the name of the user

        let directoryName = getDirName(req);
        fileServer.getFile(directoryName)
            .then(function (files) {
                res.json({ success: true, result: files })
            })
            .catch(function (err) {
                res.json({ success: false, reason: err })
            })
    },

    fileDownload: function (req, res) {
        let dirName = getDirName(req);
        let fileName = req.params.fileName;

        res.download(CONSTANTS.FILE_PATH + dirName + '/' + fileName)
    },

    downloadAll: function (req, res) {
        let dirName = getDirName(req);

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

    getDirTree: function (req, res) {
        let dir = req.body.dir;
        let storagePath = getStoragePath(req);
        let result = '<ul class="jqueryFileTree" style="display: none;">';
        try {
            result = '<ul class="jqueryFileTree" style="display: none;">';
            let files = fs.readdirSync(path.normalize(__dirname + storagePath + dir));
            files.forEach(function (file) {
                let relativePath = dir + file;
                let stats = fs.statSync(path.normalize(__dirname + storagePath + relativePath));
                if (stats.isDirectory()) {
                    result += `<li class="directory collapsed"><a href="#" rel="${relativePath}/"> ${file}</a></li>`;
                } else {
                    let fileExtension = file.split('.')[1];
                    result += `<li class="file ext_${fileExtension}"><a href="#" rel="${relativePath}">${file}</a></li>`;
                }
            });

            result += '</ul>';
        } catch (e) {
            result += `Could not load directory: ${dir}`;
            result += '</ul>';
        }

        res.send(result)
    },

    getCurrentDir: function (req, res) {
        let dir = req.body.dir;
        let data = [];
        let storagePath = getStoragePath(req);
        let files = fs.readdirSync(path.normalize(__dirname + storagePath + dir));
        files.forEach(function (file) {
            let relativePath = dir + file;
            let currentFile = {};
            let stats = fs.statSync(path.normalize(__dirname + storagePath + relativePath));
            currentFile.name = file
            
            if (stats.isDirectory()) {
                currentFile.type = 'folder';
                currentFile.path = relativePath + '/';
            } else {
                let fileExtension = file.split('.')[1];
                currentFile.type = fileExtension;
                currentFile.path = relativePath;
            }
            data.push(currentFile)
        });

        res.json({ result: data })
    },

    deleteFile: function (req, res){
        let fileRelativePath = req.body.name;
        let storagePath = getStoragePath(req);
        let filePath = path.normalize(__dirname + storagePath + fileRelativePath);
        fileSystem.deleteFile(filePath)
            .then(function () {
                res.json({ success: true, result: 'successfully deleted' })
            })
            .catch((err) => {
                res.json({ success: false, result: err })
            });
    },

    mkdir: function (req, res){
        let dirName = req.body.dirName;
        let dirRelativePath = req.body.dirPath;
        let storagePath = getStoragePath(req);
        let filePath = path.normalize(__dirname + storagePath + dirRelativePath + dirName);
        fileSystem.mkdir(filePath)
            .then(function () {
                res.json({ success: true, result: 'successfully created' })
            })
            .catch((err) => {
                res.json({ success: false, result: err })
            });
    }, 
};

function getStoragePath (req) {
    // if admin return storage path 
    // if(true){
         return CONSTANTS.STORAGE_PATH 
    // }

    // return path to user directory 
    // let name = req.user.name
    // return `${CONSTANTS.STORAGE_PATH}toma/`;
}

function getDirName(req) {
    //  let name = res.user.username

    //just for the test
    return 'toma';
}