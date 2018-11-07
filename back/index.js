const app = require('express')();
const redis = require('./src/util/redis'); 

// redis monitoring
redis.keys('*', (_, keys) => {
  if (keys.length) {
    console.log('USERS:')
    keys.forEach(it => {
      redis.get(it, (_, reply) => {
        console.log(it + ':', reply.slice(0, 10));
      });
    });
  }
});

const signout = require('./src/api/signout');
const signin = require('./src/api/signin');
const signup = require('./src/api/signup');
const sessionverification = require('./src/api/sessionverification');
const republics = require('./src/api/republics');
const zones = require('./src/api/zones');
const sectors = require('./src/api/sectors');
const industries = require('./src/api/industries');
const objects = require('./src/api/objects'); 
const infrastructures = require('./src/api/infrastructures'); 
const objects_list = require('./src/api/objects_list'); 
const infrastructures_list = require('./src/api/infrastructures_list'); 
const earth_list = require('./src/api/earth_list'); 
const provinces = require('./src/api/provinces'); 
const foreign_investments = require('./src/api/foreign_investments'); 
const investments = require('./src/api/investments'); 
const number_jobs = require('./src/api/number_jobs'); 
const production = require('./src/api/production'); 
const taxes = require('./src/api/taxes'); 
const exports_volume = require('./src/api/exports_volume'); 
const spent_foreign_investments = require('./src/api/spent_foreign_investments'); 
const members = require('./src/api/members'); 
const links_adilet = require('./src/api/links_adilet'); 

app
  .use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  .use('/back/api/signout', signout)
  .use('/back/api/signin', signin)
  .use('/back/api/signup', signup)
  .use('/back/api/sessionverification', sessionverification)
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
  .use('/back/api/foreign_investments', foreign_investments)
  .use('/back/api/investments', investments)
  .use('/back/api/number_jobs', number_jobs)
  .use('/back/api/production', production)
  .use('/back/api/taxes', taxes)
  .use('/back/api/exports_volume', exports_volume)
  .use('/back/api/spent_foreign_investments', spent_foreign_investments)
  .use('/back/api/members', members)
  .use('/back/api/links_adilet', links_adilet)

  .listen(5000, () => console.log('Listen on 5000'));