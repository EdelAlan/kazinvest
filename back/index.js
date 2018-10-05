const app = require('express')();
const signin = require('./src/signin');

// api
const republics = require('./src/api/republics'); // 1 level
const zones = require('./src/api/zones'); // 2 level
const sectors = require('./src/api/sectors'); // 3 level
const industries = require('./src/api/industries'); // for filter
const objects = require('./src/api/objects'); // for legend

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
  .use('/back/api/objects', objects)
  .use('/back/api/republics', republics)

  .listen(5000, () => console.log('Listen on 5000'));