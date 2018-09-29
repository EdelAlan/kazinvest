const express = require('express')();
// api
const map = require('./src/api/map');

express
  .use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  // api
  .use('/api/map', map)
  
  .listen(5000, () => console.log('Listen on 5000'));