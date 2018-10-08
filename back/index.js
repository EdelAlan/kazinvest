const app = require('express')();
const signin = require('./src/signin');

// api
const republics = require('./src/api/republics'); // 1 level
const zones = require('./src/api/zones'); // 2 level
const sectors = require('./src/api/sectors'); // 3 level
const industries = require('./src/api/industries'); // for filter
const objects = require('./src/api/objects'); // for legend
const objects_handbook = require('./src/api/objects_handbook'); // for legend
const earth_sectors = require('./src/api/earth_sectors'); // for legend

app
  .use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  .use('/back/signin', signin)
  // api
  .use('/back/api/republics', republics)
  .use('/back/api/zones', zones)
  .use('/back/api/sectors', sectors)
  .use('/back/api/industries', industries)
  .use('/back/api/objects', objects)
  .use('/back/api/objects_handbook', objects_handbook)
  .use('/back/api/earth_sectors', earth_sectors)

  .listen(5000, () => console.log('Listen on 5000'));