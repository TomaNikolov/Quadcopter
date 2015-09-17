var templateGenerator = (function () {
    var handlebars = window.handlebars || window.Handlebars;
    var lazy = {};

    function get(name) {
        var url = 'views/' + name + '.handlebars'
        var promise = new Promise(function (resolve, reject) {
            if (!lazy[url]) {
                $.get(url, function (html) {
                    var template = handlebars.compile(html);
                    lazy[url] = template;
                    resolve(lazy[url])
                });
            } else {
                resolve(lazy[url])
            }
        });

        return promise;
    }

    return {
        get: get
    }
}());
