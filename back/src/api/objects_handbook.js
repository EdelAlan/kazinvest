const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  const { type } = req.query;
  const sql = `SELECT * FROM objects_handbook ${type ? 'WHERE type = $1' : ''}`;
  const params = type ? [type] : [];
  
  console.log(sql);
  console.log(params);
  
  res.send(await db_query(sql, params));
});

module.exports = router;
