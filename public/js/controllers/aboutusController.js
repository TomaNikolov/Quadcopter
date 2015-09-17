var aboutusController = (function () {
    function init(context) {

        templateGenerator
            .get('aboutus')
            .then(function (template) {
                context.$element()
                    .html(template());
            });
    }

    return {
        init: init
    };
}());
