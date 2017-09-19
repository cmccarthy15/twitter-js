module.exports = function (io){

  const express = require('express');
  const router = express.Router();
   // could use one line instead: const router = require('express').Router();
  const path = require('path');

  const bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.use(express.static('public'));
 // the line above is in place of individual
 // .gets for each file path and res.sendFile the file

  const tweetBank = require('../tweetBank');

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
    res.redirect('/');
  });

  // router.get('/stylesheets/style.css', function(req, res){
  //   res.sendFile(path.resolve(__dirname, '../public/stylesheets/style.css'));
  // });

  // module.exports = router;

  return router;
};
