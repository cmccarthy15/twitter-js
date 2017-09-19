const express = require('express');
const router = express.Router();
const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
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
  res.render('index', { tweets: tweets });
});

router.get('/tweets/:id', function(req, res){
  var id = +req.params.id;
  let tweet = tweetBank.find({ id: id });
  res.render('index', { tweets: tweet });
});

router.use(express.static('public'));

// router.get('/stylesheets/style.css', function(req, res){
//   res.sendFile(path.resolve(__dirname, '../public/stylesheets/style.css'));
// });

module.exports = router;
