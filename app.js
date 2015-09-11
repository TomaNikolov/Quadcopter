var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api/user', function(req, res){
  res.send('Toma');
});

 app.listen(3000, function(){
  console.log('server is running at port 3000');
});
