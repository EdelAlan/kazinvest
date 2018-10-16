const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (_, res) => {
  res.send(await db_query(`
    SELECT  province_id AS id, title_ru, title_en, title_kz provincename FROM (
      SELECT 
        zone.province_id, 
        provinces.id, 
        provinces.provincename, 
        provinces.title_ru, 
        provinces.title_en, 
        provinces.title_kz 
      FROM zone 
      LEFT JOIN provinces ON zone.province_id = provinces.id
    ) AS agg GROUP BY province_id , provincename, title_ru, title_en, title_kz
  `));
});

module.exports = router;


