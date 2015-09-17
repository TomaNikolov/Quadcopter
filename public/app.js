var sammy = Sammy('#content', function() {

  this.get('#/',function (context) {
    removeActiveclassFromHeader()
    $('#home').addClass('active');
    homeController.init(context)
  })

  this.get('#/contacts',function (context) {
    removeActiveclassFromHeader()
    $('#contacts').addClass('active');
    contactsController.init(context)
  });

  this.get('#/portfolio',function (context) {
    removeActiveclassFromHeader()
    $('#portfolio').addClass('active');
    portfolioController.init(context)
  });

  this.get('#/aboutus',function (context) {
    removeActiveclassFromHeader()
    $('#aboutus').addClass('active');
    aboutusController.init(context)
  });

  this.get('#/video',youtubeController.init);

  this.get('#/setup',setUpController.init);


  this.get('', function() {
    console.log(all)
   });
});

sammy.run('#/');

function removeActiveclassFromHeader() {
  var $active = $('.nav, .navbar-nav, .navbar-right, .active');
    $active.removeClass('active');
}
