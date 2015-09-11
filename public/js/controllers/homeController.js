var homeController = (function () {
  function init(context) {

    templateGenerator
    .get('home')
    .then(function(template){
      context.$element()
      .html(template());
    });
  }

  return {
    init: init
  };
}());
