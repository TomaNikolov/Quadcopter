'use strict';

var fileServer = require('../data/file-server');

var FILE_PATH = '../Quadcopter/file-server/';

function getDirName (req) {
  //  var name = res.user.username
    
    //just for the test
    return 'toma';
} 

module.exports = {
  getFiles: function (req, res) {
      // TODO user validation
      // dir name is the name of the user
      
      var directoryName = getDirName(req);
    fileServer.getFile(directoryName)
    .then(function(files) {
         res.json({success: false, result: files})
    })  
    .catch(function (err) {
        res.json({success: false, reason: err})
    })
  },
  
  fileDownload: function (req, res) {
      var dirName = getDirName(req);
      var fileName = req.params.fileName;
      
      res.download(FILE_PATH + dirName + '/' + fileName)
  },
  
  downloadAll: function (req, res) {
      var dirName = getDirName(req);
      
     fileServer.zipFile(dirName)
      .then(function (zipFilePath) {
          console.log('-------------Download')
          console.log(zipFilePath);
          res.download(zipFilePath, 'some.zip', function(err){
            //  fileServer.deleteZip(zipFilePath)
          });
       })
      .catch(function(err){
          res.json({success: false, reason: err})
      })
  } 
};