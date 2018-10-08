const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  res.send(await db_query(
    `SELECT project_type FROM sectors GROUP BY project_type`,
  ));
});

module.exports = router;
