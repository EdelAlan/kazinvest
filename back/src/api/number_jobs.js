const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  const { parent_id } = req.query;

  const sql = 
    `SELECT * FROM qindicators_numberjobs
    ${parent_id ? 'WHERE parent_id = $1' : ''}
    ORDER BY year`;
  
  const params = parent_id ? [parent_id] : [];

  return res.send(await db_query( sql, params ));
});

module.exports = router;
