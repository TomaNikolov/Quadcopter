var setUpController = (function () {
    function init(context) {

        data.user.setUp()
            .then(function (template) {
                //  console.log(template);
                context.$element()
                    .html(template);
            })
            .catch(function (err) {

            });
    }

    return {
        init: init
    };
}());
