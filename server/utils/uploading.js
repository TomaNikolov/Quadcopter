var fs = require('fs');

var FILES_DIR = __dirname + '/../storage';

module.exports = {
    saveFile: function(file, path, fileName) {
        var fstream = fs.createWriteStream(FILES_DIR + path + fileName);
        file.pipe(fstream);
    }
};