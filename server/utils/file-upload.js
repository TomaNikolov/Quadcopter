'use strict'

var fs = require('fs');
var imageMagick = require('imagemagick');
var Promise = require('bluebird');
var path = require('path');

var FULL_SIZE_PATH = path.normalize(__dirname + './../../public/img/fullSize/');
var THUMBS_PATH = path.normalize(__dirname + './../../public/img/thumbs/');

module.exports = {
  save: function (file, fileName) {
    var promise = new Promise(function (resolve, reject) {
      var fstream;

      fstream = fs.createWriteStream(FULL_SIZE_PATH + fileName);
      file.pipe(fstream);

      fstream.on('close', function () {
        resolve('file is saved to the file system!');
      });
      file.on('data', function(){
        console.log('got data')
      })
      
       file.on('end', function(){
        console.log('finish')
      })
    });

    return promise;
  },
  
  resize: function (fileName) {
    var promise = new Promise(function (resolve, reject) {
      console.log(fileName);
    console.log(FULL_SIZE_PATH + fileName)
    console.log(THUMBS_PATH + fileName);
      imageMagick.resize({
          srcPath: FULL_SIZE_PATH + fileName,
          dstPath: THUMBS_PATH + fileName,
          width: 200
        },
        function (err, stdout, stderr) {
          if (err) {
            console.log(err);
            reject(err);
          }

          resolve('resized image to fit within 200x200px');
        });
    });

    return promise;
  }
};
