//var portfolioController = (function () {
//    var context;
//    var gallery = {};
//
//    function init(routeContext) {
//        context = routeContext;
//
//        data.video.get()
//            .then(function (resVideos) {
//                gallery.video = resVideos;
//            })
//            .then(function () {
//                return data.image.get();
//            })
//            .then(function (resImages) {
//                gallery.images = resImages;
//            })
//            .then(function () {
//                return templateGenerator
//                    .get('portfolio')
//            })
//            .then(function (template) {
//                context.$element()
//                    .html(template(gallery));
//            })
//            .then(function () {
//                $("a[rel^='prettyPhoto']").prettyPhoto();
//            })
//            .then(function () {
//                bindEvents();
//            });
//    }
//
//    function bindEvents() {
//        $('.video').on('click', function () {
//           var $this = $(this);
//         var   videoAttr = $this.attr('data-id');
//            context.redirect('#/video?id=' + videoAttr);
//        })
//    }
//
//    return {
//        init: init
//    };
//}());

(function () {
    'use strict';

    function PortfolioController(portfolio) {
        var vm = this;

        portfolio.getImages()
            .then(function(res){
                console.log(res);
                vm.images = res.images
            });

        portfolio.getVideos()
            .then(function(res){
                vm.videos = res.videos;
            })
    }

    angular.module('quadCopter.controllers')
        .controller('PortfolioController', ['portfolio', PortfolioController])
}());
