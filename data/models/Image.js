'use strict'

var mongoose = require('mongoose');

module.exports.init = function () {
  var imageSchema = mongoose.Schema({
    name : {type : String, required : true},
    sortNumber : {type : Number}
  });

  mongoose.model('Image', imageSchema);
};
