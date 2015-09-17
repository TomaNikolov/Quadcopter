var youtubeController = (function () {
    function init(context) {
        var id = context.params.id;

        templateGenerator
            .get('youtube')
            .then(function (template) {
                context.$element()
                    .html(template(id));
            })
            .then(function () {
                bindEvents();
            });
    }

    function bindEvents() {

    }

    return {
        init: init
    };
}());
