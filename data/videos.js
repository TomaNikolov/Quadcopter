'use strict'

var Video = require('mongoose').model('Video');
var Promise = require('bluebird');

module.exports = {
  create: function (video) {
    console.log(video)
    var promise = new Promise (function(resolve, reject){
      Video.create(video, function (err, dbVideo){
        if(err){
          reject(err);
        }

        if(!dbVideo){
          reject('Video could not be saved in database!')
        }

        resolve(dbVideo);
      });
    });

    return promise;
  },
  getAll : function(){
    var promise = new Promise(function (resolve, reject) {
      Video.find({}, function(err, dbVideos){
        if(err){
          reject(err);
        }

        if(!dbVideos){
          reject('There is no video!')
        }

        resolve(dbVideos);
      })
    });

    return promise;
  }
}
