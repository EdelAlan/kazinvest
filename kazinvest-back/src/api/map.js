const {
  Router
} = require('express');
const bodyparser = require('body-parser');
const db_query = require('../util/db_query')

const router = module.exports = Router();

router.use(bodyparser.json());

router.get('/zone', async (req, res) => {
  res.send(await db_query({
    query: 'SELECT * from zone'
  }));
});

router.get('/zone/:id', async (req, res) => {
  res.send(await db_query({
    query: 'SELECT * from zone where id = ' + req.params.id
  }));
});

router.get('/sector/:id', async (req, res) => {
  res.send(await db_query({
    query: 'SELECT * from sectors where zone_id = ' + req.params.id
  }));
});