const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors',
  ));
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where zone_id = $1',
    [req.params.id],
  ));
});

module.exports = router;
