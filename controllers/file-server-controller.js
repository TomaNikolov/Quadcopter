'use strict';

var fileServer = require('../data/file-server');

module.exports = {
  getFiles: function (req, res) {
      // TODO user validation
      var directoryName = req.params.directory;
      
      console.log(directoryName);
      
    fileServer.getFile(directoryName)
    .then(function(files) {
         res.json({success: false, result: files})
    })  
    .catch(function (err) {
        res.json({success: false, reason: err})
    })
  }  
};