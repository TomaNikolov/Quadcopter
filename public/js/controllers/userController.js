var homeController = (function () {
  $('#btn-login').on('click', function(){
    var user = {
      username : $('#tb-username').val(),
      password : $('#tb-pass').val()
    };
console.log(user);
  });
}());
