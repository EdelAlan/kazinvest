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

router.get('/:zone_id', async (req, res) => {
  res.send(await db_query(
    `SELECT ${FIELDS} from objects where zone_id = $1`,
    [req.params.zone_id],
  ));
});

module.exports = router;
