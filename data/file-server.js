'use strict';
var fs = require('fs');
var Promise = require('bluebird');

var FILE_PATH = '../Quadcopter/file-server/';

module.exports = {
    getFile: function (dirName) {
        var folderPath = FILE_PATH + dirName;
        console.log(folderPath)
        return new Promise(function (resolve, reject) {
           fs.stat(folderPath, function (err) {
               if(err){
                   reject('Folder doesn\'t exist')
                   return;
               }
               
               fs.readdir(folderPath, function (err, files) {
                   if(err){
                        reject(err);
                        return;         
                   }
                   
                   resolve(files);
               });
           }); 
        });
    }
};