const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  const { zone_type } = req.query;
  return res.send(await db_query(`
      SELECT zone.*, (
        SELECT COUNT(*) AS object_count 
        FROM sectors 
        WHERE zone.id = sectors.zone_id
      ) FROM zone ${
        // FIXME:  отрефакторить
        !zone_type || zone_type == 3 
        ? 'WHERE zone_type = 1 OR zone_type = 2' 
        : 'WHERE zone_type = $1'
      }
    `,
    !zone_type || zone_type == 3 ? [] : [zone_type],
  ));
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from zone where id = $1',
    [req.params.id],
  ));
});

module.exports = router;
