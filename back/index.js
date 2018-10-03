const app = require('express')();
const signin = require('./src/signin');

// api
const zones = require('./src/api/zones');
const sectors = require('./src/api/sectors');
const industries = require('./src/api/industries');

app
  .use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  .use('/back/signin', signin)
  // api
  .use('/back/api/zones', zones)
  .use('/back/api/sectors', sectors)
  .use('/back/api/industries', industries)

  .listen(5000, () => console.log('Listen on 5000'));