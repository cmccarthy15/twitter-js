const express = require('express');
const router = express.Router();
const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.use(express.static('public'));

// router.get('/stylesheets/style.css', function(req, res){
//   res.sendFile(path.resolve(__dirname, '../public/stylesheets/style.css'));
// });

module.exports = router;
