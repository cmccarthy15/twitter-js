const express = require('express');
const app = express();

app.use(function(response, request, next){
  // console.log(request.domain); //verb
  // console.log(); //route
  next();
});

app.get('/', function(request, response){
  response.send('Jambo');
});

app.get('/news', function(request, response){
  response.send("You've got news!");
});

app.listen(3000, function(){
  console.log('server listening...');
});
