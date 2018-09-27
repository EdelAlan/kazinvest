const {
  Client
} = require('pg');
const client = new Client();
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

module.exports = async ({
  query,
  params
}) => {
  return await client.query(query, params)
    .then(res => {
      return res.rows
    })
    .catch(e => console.error(e.stack))
}