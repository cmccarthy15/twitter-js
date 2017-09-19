const express = require('express');
const app = express();

const chalk = require('chalk');
const volleyball = require('volleyball');
const morgan = require('morgan');

const routes = require('./routes');

const locals = {
  title: 'An Example',
  people: [
      { name: 'Gandalf'},
      { name: 'Frodo' },
      { name: 'Hermione'}
  ]
};

const nunjucks = require('nunjucks');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });
// play with morgan configuration later
app.use(morgan('tiny'));
app.use('/', routes);

// WITHOUT MORGAN OR VOLLEYBALL
// app.use(function(req, res, next){
//   console.log(req.method, req.url, res.statusCode);
//   next();
// });

// LOOKING FOR A SPECIAL TYPE OF URI
// app.use('/special', function(req, res, next){
//   console.log("you're in a special area");
//   console.log(req.method, req.url, res.statusCode);
//   next();
// });


app.listen(3000, function(){
  console.log('server listening...');
});
