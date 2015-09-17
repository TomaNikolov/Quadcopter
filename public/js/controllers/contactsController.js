var contactsController = (function () {
    function init(context) {

        templateGenerator
            .get('contacts')
            .then(function (template) {
                context.$element()
                    .html(template());
            });
    }

    return {
        init: init
    };
}());
