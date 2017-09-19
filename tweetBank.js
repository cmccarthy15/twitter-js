const _ = require('lodash');
const data = [ ];


function add (name, content) {
  data.push({ name: name, content: content, id: data.length });
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}


// var names = ['David Stackson', 'Omri Stackson', 'Karen Docsreader', 'Shanna Ternary', 'Dan Docsreader'];

// var tweets = ['Fullstack Academy is awesome! The instructors are just so amazing. #fullstacklove #codedreams', 'Fullstack Academy is wonderful! The instructors are just so sweet. #fullstacklove #codedreams', 'Fullstack Academy is sweet! The instructors are just so funny. #fullstacklove #codedreams', 'Fullstack Academy is sweet! The instructors are just so breathtaking. #fullstacklove #codedreams', 'Fullstack Academy is amazing! The instructors are just so breathtaking. #fullstacklove #codedreams'];

// for (let i = 0; i < 5; i++){
//   module.exports.add(names[i], tweets[i]);
// }
