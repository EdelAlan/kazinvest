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
  console.log(`SELECT ${FIELDS} FROM objects ${zone_id ? 'WHERE zone_id = $1' : ''}`)
  res.send(await db_query(
    `SELECT ${FIELDS} FROM objects ${zone_id ? 'WHERE zone_id = $1' : ''}`,
    zone_id ? [zone_id] : [],
  ));
});

module.exports = router;
