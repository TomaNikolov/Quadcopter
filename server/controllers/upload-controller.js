'use strict';

let uploading = require('../utils/uploading');
// TODO: get path from request
let PATH_TO_SAVE = '/toma/';

module.exports = {
    fileUpload: function (req, res) {
         req.pipe(req.busboy);
         let uploadedFiles = [];

        req.busboy.on('file', function (fieldname, file, filename) {
            uploading.saveFile(file, PATH_TO_SAVE, filename);
            uploadedFiles[fieldname] = uploadedFiles[fieldname] || [];
        });

        req.busboy.on('field', function(fieldname, val) {
            let index = fieldname.split('_')[1];
            uploadedFiles[fieldname] = uploadedFiles[fieldname] || [];
            uploadedFiles[fieldname]['file_' + index] = uploadedFiles[fieldname]['file_' + index] || {};
        });

        req.busboy.on('finish', function() {
             res.json({ success: true })
        });
    }
};
