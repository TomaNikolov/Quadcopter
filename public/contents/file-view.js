var navigation = {
    back: [],
    forward: [],
    previousPath: ''
}


if (jQuery) (function ($) {


    $.extend($.fn, {
        fileView: function (optins, filecallback, directorycalback) {
            var that = this;

            // Defaults
            if (!optins) var optins = {};
            if (optins.root == undefined) optins.root = '/';
            if (optins.script == undefined) optins.script = 'jqueryFileTree.php';
            if (optins.folderEvent == undefined) optins.folderEvent = 'click';
            if (optins.loadMessage == undefined) optins.loadMessage = 'Loading...';

            pattern = '<div class="col-md-3">' +
                '<div id="type" class="row">' +
                '<div id="file-name" class="row file-name"></div>' +
                '</div>' +
                '</div>';

            function showTree(elementm, path) {
                $(this).addClass('wait');
                // $(".jqueryFileTree.start").remove();
                $.post(optins.script, { dir: path }, function (data) {
                    $(elementm).find('.start').html('');
                    $(elementm).removeClass('wait');
                    var result = data.result;

                    result.forEach(function (file) {
                        var type = getType(file.tipe)
                        var newFile = $(pattern)
                            .attr('rel', file.path)
                            .find('#type')
                            .addClass(type)
                            .find('#file-name').innerText(file.name)
                    });

                    $(elementm).append(newFile);

                    if (navigation.previousPath !== '') {
                        navigation.back.push(navigation.previousPath);
                    }

                    navigation.previousPath = path;
                    
                });
            }

            showTree(this, optins.root);
            consolesslog('aasssssss')



            $('#back').bind('click', function () {
                var length = navigation.back.length;
                console.log('back: ', length)
                if (length > 0) {
                    var path = navigation.back.splice(length - 1, 1)
                    navigation.forward.push(optins.root);
                    optins.root = path
                    showTree(that, optins)
                }
            });

            $('#forward').on('click', function () {
                console.log('forward: ', length)
                var length = navigation.forward.length;
                if (length > 0) {
                    var path = navigation.forward.splice(length - 1, 1)
                    navigation.back.push(optins.root);
                    optins.root = path
                    showTree(that, optins)
                }
            });



        }
    });


})(jQuery);

