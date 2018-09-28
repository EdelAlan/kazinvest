const express = require('express');
const controller = require('./src/api/map');

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