'use strict';

var videos = require('../data/videos');

module.exports = {
    create: function (req, res) {
        var video = req.body;
        if (!video.name) {
            res
                .status(401)
                .json({success: false, reason: 'Video name is required'});

            return;
        }

        videos
            .create(video)
            .then(function (dbVideo) {
                res.json({
                    success: true,
                    video: {
                        name: dbVideo.name,
                        id: dbVideo._id
                    }
                });
            })
            .catch(function (err) {
                res.json({success: false, reason: err});
            });
    },
    getAll: function (req, res) {
        videos
            .getAll()
            .then(function (dbVideos) {
                res
                    .status(200)
                    .json({success: true, videos: dbVideos});
            })
            .catch(function (err) {
                res.json({success: false, reason: err})
            });
    }
};
