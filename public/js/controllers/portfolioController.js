var portfolioController = (function () {
  function init(context) {

    templateGenerator
    .get('portfolio')
    .then(function(template){
      context.$element()
      .html(template());
    });
  }

  return {
    init: init
  };
}());
