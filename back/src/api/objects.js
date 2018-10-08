const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  id,
  zone_id,
  status,
  type,
  dotted_coord,
  created_date,
  ST_AsGeoJson(objects.geom)
`;

router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  const sql = `SELECT ${FIELDS} FROM objects ${zone_id ? 'WHERE zone_id = $1' : ''}`;
  const params = zone_id ? [zone_id] : [];
  
  console.log(sql);
  console.log(params);
  
  res.send(await db_query(sql, params));
});

module.exports = router;
