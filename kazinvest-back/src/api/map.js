const router = require('express-async-router').AsyncRouter();
// const bodyparser = require('body-parser');  // только для post нужен
const db_query = require('../util/db_query');
// router.use(bodyparser.json()) // только для post нужен


router.get('/zones', async (req, res) => {
  //FIXME: отрефакторить!
  if (!req.query.zone_type) {
    return res.send(await db_query(`
      SELECT * FROM zone
    `));
  }
  if (req.query.zone_type == 3) {
    return res.send(await db_query(`
      SELECT zone.*, (
        SELECT COUNT(*) AS object_count 
        FROM sectors 
        WHERE zone.id = sectors.zone_id
      ) FROM zone
    `));
  }
  return res.send(await db_query(`
    SELECT zone.*, (
      SELECT COUNT(*) AS object_count 
      FROM sectors 
      WHERE zone.id = sectors.zone_id
    ) FROM zone WHERE zone_type = $1`,
    [req.query.zone_type],
  ));
});

router.get('/zones/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from zone where id = $1', // нужны параметры, чтобы не получить sql инъекцию
    [req.params.id],
  ));
});

router.get('/sectors', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors',
  ));
});

router.get('/sectors/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where zone_id = $1',
    [req.params.id],
  ));
});

module.exports = router;
