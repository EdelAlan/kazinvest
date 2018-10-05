const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  return res.send(await db_query(
    'SELECT * FROM republics', 
  ));
});

module.exports = router;
