const {
  Client
} = require('pg');
const client = new Client({
  user: 'postgres',
  // host: '192.168.55.167',
  // database: 'kazinvest',
  host: 'localhost',
  database: 'alan',
  password: '1',
  port: 5432,
});
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
    return err.stack;
  } else {
    console.log('Postgre connected');
  }
});

module.exports = async (
  query,
  params
) => {
  return await client.query(query, params)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}