const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (_, res) => {
  res.send(await db_query(
    `SELECT * FROM industries`,
  ));
});

module.exports = router;