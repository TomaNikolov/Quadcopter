'use stric'

var User = require('mongoose').model('User');
var Promise  = require('bluebird');

module.exports = {
  create : function(user){
    var promise = new Promise(function(resolve, reject){
      User.create(user, function(err, dbUser){
        if(err){
          if(err.code === 11000){
            reject('User name has already been taken!')
          }else{
            reject(err);
          }
        }

        if(!dbUser){
        reject('user could not be saved in database!')
        }

        resolve(dbUser);
      });
    });

    return promise;
  },
  findByUserName: function(username){
    var promise = new Promise (function(resolve, reject){
      User.findOne({username: username}).exec(function(err, dbUser){
        if(err){
          reject(err);
        }

        if(!dbUser){
          reject('Unauthorised');
        }

        resolve(dbUser);
      });
    });

    return promise;
  },
findByToken: function(token){
  var promise = new Promise(function(resolve, reject){
    User.findOne({accessToken: token}).exec(function(err, dbUser){
      if(err){
        reject(err);
      }

      if(!dbUser){
        reject('Unauthorised');
      }

      resolve(dbUser);
    });
  });

  return promise;
  }
};
