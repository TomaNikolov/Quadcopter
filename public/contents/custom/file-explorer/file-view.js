
if (jQuery) (function ($) {

    var navigation = {
        back: [],
        forward: [],
        previousPath: ''
    }

    var singletone = 0;

    $.extend($.fn, {
        fileView: function (options, filecallback, directorycalback) {
            var $that = $(this);
            // Defaults
            if (!options) var options = {};
            if (options.root == undefined) options.root = '/';
            if (options.script == undefined) options.script = '/api/getFiles';
            if (options.folderEvent == undefined) options.folderEvent = 'click';
            if (options.loadMessage == undefined) options.loadMessage = 'Loading...';

            var pattern = '<div class="col-md-3 file-container">' +
                '<a>' +
                '<div id="type" class="files row task"></div>' +
                '<div id="file-name" class="row file-name"></div>' +
                '</a>' +
                '</div>';

            function showTree(elementm, path, isFromHistory) {
                $('.file-container').remove()
                //write current dir name in elemen.
                $('#current-dir-name').attr('rel', path)
                console.log(path)
                $.post(options.script, { dir: path }, function (data) {
                    var result = data.result;
                    result.forEach(function (file) {
                        var type = getType(file.type)
                        var html = $(pattern);
                        html
                            .find('#type')
                            .attr('rel', file.path)
                            .addClass(type);

                        html
                            .find('#file-name').text(file.name);

                        $(elementm).append(html);
                        
                        bindEvents(file, html);
                    });
                    
                    if (navigation.previousPath !== '' && !isFromHistory) {
                        console.log('push in hisory')
                        navigation.back.push(navigation.previousPath);
                    }

                    navigation.previousPath = path;
                });
            }

            function bindEvents(file, element) {
                if (file.type == 'folder') {
                    element.bind('click', function () {
                        console.log('in event')
                        var path = $(element).find('#type').attr('rel');
                        $that.fileView({ root: path, sctipt: options.script })
                    })
                } else {
                       //TODO open file
                }
            }

            function getType(type) {
                switch (type) {
                    case 'folder':
                        return 'folder';
                    case 'file':
                        return 'file';
                    case 'js':
                        return 'js';
                    case 'jpg':
                        return 'jpg';
                    case 'png':
                        return 'png';
                    case 'jpeg':
                        return 'jpeg';
                    default:
                        return 'default'
                }
            }

            showTree(this, options.root);
            
            if (singletone === 0) {
                $('#back').bind('click', function () {
                    var length = navigation.back.length;
                    console.log('back: ', length)
                    if (length > 0) {
                        var path = navigation.back.splice(length - 1, 1)
                        navigation.forward.push(options.root);
                        options.root = path
                        showTree($that, options.root, true)
                    }
                });

                $('#forward').bind('click', function () {
                    var length = navigation.forward.length;
                    console.log('forward: ', length)
                    var length = navigation.forward.length;
                    if (length > 0) {
                        var path = navigation.forward.splice(length - 1, 1)
                       // navigation.back.push(options.root);
                        options.root = path
                        showTree($that, options.root)
                    }
                });

                singletone++;
            }

           // create dir
            $('#create-dir').on('click', function () {
                var dirPath = $('#current-dir-name').attr('rel');
                var dirName = $('#dir-name').val();
                createFolder(dirName, dirPath);
            });

            $('#create-dir').on('click', function () {
                $('#current-dir-name').val('');
            });

            function createFolder(dirName, dirPath) {
                $.post('api/createDir', { dirName: dirName, dirPath: dirPath }, function (data) {
                        var html = $(pattern);
                    html
                        .find('#type')
                        .attr('rel', dirPath + dirName + '/' )
                        .addClass('folder');

                    html
                        .find('#file-name').text(dirName);

                    $that.append(html);
                    
                    bindEvents({type: 'folder'}, html);
                });
            }
        }
    });
})(jQuery);