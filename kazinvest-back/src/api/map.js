const router = require('express-async-router').AsyncRouter();
// const bodyparser = require('body-parser');  // только для post нужен
const db_query = require('../util/db_query');

// router.use(bodyparser.json()) // только для post нужен
router.get('/zone', async (_, res) => {
  res.send(await db_query(
    'SELECT * from zone'
  ));
});

router.get('/zone/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from zone where id = $1', // нужны параметры, чтобы не получить sql инъекцию
    [req.params.id],
  ));
});

router.get('/sector/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where zone_id = $1',
    [req.params.id],
  ));
});

module.exports = router;
