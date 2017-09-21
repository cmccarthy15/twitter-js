/* MY SOLUTION --- MY SOLUTION --- MY SOLUTION

module.exports = function (io){

  const express = require('express');
  const router = express.Router();
   // could use one line instead: const router = require('express').Router();
  //const path = require('path');

  const bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.use(express.static('public'));
 // the line above is in place of individual
 // .gets for each file path and res.sendFile the file

  const tweetBank = require('../tweetBank');

  // write a new function (probably using io.on)
  // that when a newTweet goes out, re-renders
  // io.sockets.on('newTweet', router.get('/', function(req, res){
  //   let tweets = tweetBank.list();
  //   res.render( 'index', { tweets: tweets, showForm: true } );
  //   console.log(tweets);
  // }))

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true } );
    console.log(tweets);
  });

  router.get('/users/:name', function(req, res){
    var name = req.params.name;

    //handles cases where name is the whole name
    // const nameCheck = function(user){
    //   var userName = user.name.split(' ').join('').toLowerCase();
    //   return userName.indexOf(name.toLowerCase()) > -1;
    // };

    let tweets = tweetBank.find( {name: name} );
    res.render('index', { tweets: tweets, showForm: true, username: name });
  });

  router.get('/tweets/:id', function(req, res){
    var id = +req.params.id;
    let tweet = tweetBank.find({ id: id });
    res.render('index', { tweets: tweet });
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name: name, tweet: text});
    res.redirect('/users/' + name);
  });

  // router.get('/stylesheets/style.css', function(req, res){
  //   res.sendFile(path.resolve(__dirname, '../public/stylesheets/style.css'), function(err){
  //     if (err) throw err;
  //   });
  // });

  // module.exports = router;

  return router;
};

*/


/* REVIEW SOLUTION --- REVIEW SOLUTION --- REVIEW SOLUTION  */

'use strict';
var express = require('express');
var router = express.Router();
//var tweetBank = require('../tweetBank');
var client = require('../db');

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    client.query('select name, content, tweets.id from tweets inner join users on tweets.user_id = users.id', function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    client.query('select name, content, tweets.id from tweets inner join users on tweets.user_id = users.id where name=$1', [req.params.username], function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
    // var tweetsForName = tweetBank.find({ name: req.params.username });
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: tweetsForName,
    //   showForm: true,
    //   username: req.params.username
    // });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    client.query('select name, content from tweets inner join users on tweets.user_id = users.id where tweets.id = $1', [req.params.id], function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
    // var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: tweetsWithThatId // an array of only one element ;-)
    // });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    //var newTweet = tweetBank.add(req.body.name, req.body.text);
    var content = req.body.text;
    var id;
    client.query('select * from users where name=$1', [req.body.name], function(err, result){
      if (err) { return next(err);}
      else if (result.rows.length > 0) {id = result.rows[0].id;}
      else {
        client.query('insert into users (name) values($1) returning * ', [req.body.name], function(error, result){
          if (error) return next(error);
          id = result.rows[0].id;
        });
      }
      client.query('insert into tweets (user_id, content) values ($1, $2) returning *', [id, content], function (err, result) {
        if (err) return next(err); // pass errors to Express
        var tweets = result.rows;
        res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
      });
     });

    //io.sockets.emit('new_tweet', newTweet);
    //res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
};
