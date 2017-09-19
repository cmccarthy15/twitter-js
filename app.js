const express = require('express');
const app = express();
const chalk = require('chalk');

app.use('/', function(request, response, next){
  console.log(chalk.pink(request.method), request.url);
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
