/*  MY SOLUTION CODE  -- MY SOLUTION CODE -- MY SOLUTION CODE

'use strict';

const express = require('express');
const app = express();
const server = app.listen(3000);

// adds text color
const chalk = require('chalk');

// middleware that will console log basic info about the req and res
const volleyball = require('volleyball');
const morgan = require('morgan'); // more common / standard

// ...sockets...
const socketio = require('socket.io');
const io = socketio.listen(server);

const routes = require('./routes');
app.use('/', routes(io));

const locals = {
  title: 'An Example',
  people: [
      { name: 'Gandalf'},
      { name: 'Frodo' },
      { name: 'Hermione'}
  ]
};

// template rendering
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });
// play with morgan configuration later


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

*/



/* REVIEW SOLUTION --- REVIEW SOLUTION --- REVIEW SOLUTION */

'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var makesRouter = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server
var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});
var io = socketio.listen(server);

app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.use('/', makesRouter(io));

// // manually-written static file middleware
// app.use(function(req, res, next){
//   var mimeType = mime.lookup(req.path);
//   fs.readFile('./public' + req.path, function(err, fileBuffer){
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   });
// });
