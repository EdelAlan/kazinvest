const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  console.log(`SELECT * FROM sectors ${zone_id ? 'WHERE zone_id = $1' : ''}`)
  const some = await db_query(
    `SELECT * FROM sectors ${zone_id ? 'WHERE zone_id = $1' : ''}`,
    zone_id ? [zone_id] : [],
  );
  res.send(some);
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where id = $1',
    [req.params.id],
  ));
});

router.get('/geom', async (req, res) => {
  res.send(await db_query(
    'SELECT title_ru ,ST_AsGeoJSON(geom) from sectors',
  ));
});

router.get('/geom/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT title_ru , project_type, ST_AsGeoJSON(geom) from sectors where zone_id = $1',
    [req.params.id],
  ));
});

module.exports = router;
