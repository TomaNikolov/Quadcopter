var fs = require('fs');

var FILES_DIR = __dirname + '/../storage';

module.exports = {
    saveFile: function(file, path, fileName) {
        if (!fs.existsSync(FILES_DIR + path)) {
            this.createDir(path);
        }

        var fstream = fs.createWriteStream(FILES_DIR + path + fileName);
        file.pipe(fstream);
    }
};