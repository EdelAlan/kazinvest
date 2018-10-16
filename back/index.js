const app = require('express')();
const signin = require('./src/signin');

// api
const republics = require('./src/api/republics'); // 1 level
const zones = require('./src/api/zones'); // 2 level
const sectors = require('./src/api/sectors'); // 3 level
const industries = require('./src/api/industries'); // for filter
const objects = require('./src/api/objects'); // for legend
const infrastructures = require('./src/api/infrastructures'); // for legend
const objects_list = require('./src/api/objects_list'); // for legend
const infrastructures_list = require('./src/api/infrastructures_list'); // for legend
const earth_list = require('./src/api/earth_list'); // for legend
const provinces = require('./src/api/provinces'); // for legend

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
  .use('/back/api/infrastructures', infrastructures)
  .use('/back/api/provinces', provinces)
  .use('/back/api/objects_list', objects_list)
  .use('/back/api/infrastructures_list', infrastructures_list)
  .use('/back/api/earth_list', earth_list)

  .listen(5000, () => console.log('Listen on 5000'));