'use strict';

let videos = require('../data/videos');

module.exports = {
    create: function (req, res) {
        let video = req.body;
        if (!video.name) {
            req.session.err = 'Video name is required';
            res.redirect('/videos')
            return;
        }

        videos
            .create(video)
            .then(function (dbVideo) {
                res.redirect('/videos')
            })
            .catch(function (err) {
                req.session.err = err;
                res.redirect('/videos')
            });
    },

    getVideo: function (req, res) {
        res.render('videos/video');
    },

    getAll: function (req, res) {
        videos
            .getAll()
            .then(function (dbVideos) {
                res
                    .status(200)
                    .json({ success: true, videos: dbVideos });
            })
            .catch(function (err) {
                res.json({ success: false, reason: err })
            });
    }
};
