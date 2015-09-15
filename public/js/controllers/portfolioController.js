var portfolioController = (function () {
  var context;
  var gallery = {};

  function init(routeContext) {
context = routeContext;

  data.video.get()
  .then(function(resVideos){
    gallery.video = resVideos;
  })
  .then(function(){
  return    templateGenerator
    .get('portfolio')
  })
    .then(function(template){
      context.$element()
      .html(template(gallery));
    })
    .then(function () {
    $("a[rel^='prettyPhoto']").prettyPhoto();
    })
    .then(function(){
      bindEvents();
    });
  }

function bindEvents() {
  $('.video').on('click', function(){
    $this= $(this);
    videoAttr  = $this.attr('data-id');
    context.redirect('#/video?id=' + videoAttr);
  })
}
  return {
    init: init
  };
}());
