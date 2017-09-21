const pg = require('pg');
const postgresUrl = 'postgres://localhost/twitterdb';


const client = new pg.Client(postgresUrl);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
})
;

module.exports = client;
