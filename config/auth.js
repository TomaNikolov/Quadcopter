var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                res.status(401)
                    .json({ success: false, reason: 'wrong username or password!' });
                return;
            }

            if (!user) {
                res.status(401)
                    .json({ success: false, reason: 'wrong username or password!' });
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(401)
                        .json({ success: false, reason: 'wrong username or password!' });
                    return;
                }

                res.json({
                    success: true,
                    user: {
                        username: user.username,
                    }
                });
            });
        });

        auth(req, res, next);
    },

    logout: function (req, res, next) {
        req.logout();
        res.redirect('/');
    },

    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401)
                .json({ success: false, reason: 'Unauthorised!' });
        } else {
            next();
        }
    },

    isAdmin: function (req, res, next) {
        var user = req.user;

        if (user.username !== 'admin') {
            res.status(401)
                .json({ success: false, reason: 'Unauthorised!' });

            return;
        }

        next();
    }
};