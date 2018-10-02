const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors',
  ));
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where zone_id = $1',
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
