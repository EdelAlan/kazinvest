const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const COLORS = [
  '#8BC34A',
  '#448AFF',
  '#FF5722',
  '#00796B',
  '#FF4081',
  '#E040FB',
  '#5D4037',
  'rgb(170, 68, 119)',
  'rgba(60, 159, 100, 1)',
  'rgba(255, 99, 71, 1)',
  'rgba(255, 200, 86, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(245, 130, 48, 1)',
  'rgba(80, 178, 107, 1)',
  'rgba(238, 121, 66, 1)',
];

router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  const sql = `
    SELECT type, title_ru FROM (
      SELECT infrastructures.type, objects_handbook.title_ru
      FROM infrastructures
      JOIN objects_handbook ON infrastructures.type = objects_handbook.id
      WHERE zone_id = $1
    ) AS agg GROUP BY title_ru, type ORDER BY type
  `;
  
  const result = await db_query(sql, [zone_id]);

  res.send(result.map((it, idx) => ({ ...it, color: COLORS[idx], selected: true })));
});

module.exports = router;
