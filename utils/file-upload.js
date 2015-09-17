'use strict'

var fs = require('fs');
var imageMagick = require('imagemagick');
var Promise = require('bluebird');

var FULL_SIZE_PATH = __dirname + '/../public/img/fullSize/';
var THUMBS_PATH = __dirname + '/../public/img/thumbs/';

module.exports = {
  save: function (file, fileName) {
    var promise = new Promise(function (resolve, reject) {
      var fstream;

      fstream = fs.createWriteStream(FULL_SIZE_PATH + fileName);
      file.pipe(fstream);

      fstream.on('close', function () {
        resolve('file saved!');
      });
    });

    return promise;
  },
  resize: function (fileName) {
    var promise = new Promise(function (resolve, reject) {
      imageMagick.resize({
          srcPath: FULL_SIZE_PATH + fileName,
          dstPath: THUMBS_PATH + fileName,
          width: 200
        },
        function (err, stdout, stderr) {
          if (err) {
            reject(err);
          }

          resolve('resized image to fit within 200x200px');
        });
    });

    return promise;
  }
};
