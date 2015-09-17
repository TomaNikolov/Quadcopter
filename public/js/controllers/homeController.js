var homeController = (function () {
    function init(context) {

        templateGenerator
            .get('home')
            .then(function (template) {
                context.$element()
                    .html(template());
            })
            .then(function () {
                $('[data-spy="responsive-slider"]').responsiveSlider();
            });
    }

    return {
        init: init
    };
}());
