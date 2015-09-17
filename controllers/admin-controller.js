'use strict';

var path = require('path');

module.exports = {
    init: function (req, res) {
        //If it is an admin: Ok
        res.sendFile(path.resolve('views/admin.html'));
    }
};
