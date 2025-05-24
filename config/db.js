// db.js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',   // replace with your PostgreSQL username
  host: 'localhost',
  database: 'Alpha(Demo)',   // replace with your database name
  password: '12345',   // replace with your password
  port: 5432,
});

client.connect();

module.exports = client;
