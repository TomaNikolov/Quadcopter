'use strict';

var images = require('../data/images');
var fileUpload = require('../utils/file-upload');
var dateHelper = require('../utils/date-helper');

module.exports = {
    create: function (req, res) {
        var uploadedFile = {};

        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldName, file, fileName) {
            uploadedFile.fileName = fileName;
            fileUpload.save(file, fileName)
                .then(function (result) {
                    //  console.log(result);
                })
                .catch(function (err) {
                    res.json({success: false, reason: err})
                });
        });

        req.busboy.on('field', function (fieldname, val) {
            uploadedFile.title = val;
            uploadedFile.date = dateHelper.getDate()
        });


        req.busboy.on('finish', function () {
            fileUpload.resize(uploadedFile.fileName)
                .then(function (result) {
                    return images.create(uploadedFile);
                })
                .then(function (resp) {
                    res
                        .status(200)
                        .json({success: true, image: resp})
                })
                .catch(function (err) {
                    res.json({success: false, reason: err})
                });

        });
    },
    getAll: function (req, res) {
        images
            .getAll()
            .then(function (dbImages) {
                res
                    .status(200)
                    .json({success: true, images: dbImages});
            })
            .catch(function (err) {
                res.json({success: false, reason: err})
            });
    }
}
