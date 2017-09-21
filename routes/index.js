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
var tweetBank = require('../tweetBank');

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    var allTheTweets = tweetBank.list();
    res.render('index', {
      title: 'Twitter.js',
      tweets: allTheTweets,
      showForm: true
    });
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    var tweetsForName = tweetBank.find({ name: req.params.username });
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: req.params.username
    });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsWithThatId // an array of only one element ;-)
    });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    var newTweet = tweetBank.add(req.body.name, req.body.text);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
