const express = require('express');
const controller = require('./controller');

process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = '1';
process.env.PGDATABASE = 'alan';
process.env.PGPORT = '5432';

var cross = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

express()
  .use(cross)
  .use(controller)
  .listen(5000);