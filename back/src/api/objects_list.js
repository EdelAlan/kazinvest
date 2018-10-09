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
  'rgba(255, 193, 37, 1)',
  'rgba(238, 238, 0, 1)',
  'rgba(118, 238, 0, 1)',
  'rgba(78, 238, 148, 1)',
];

router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  const sql = `
    SELECT type, title_ru FROM (
      SELECT objects.type, objects_handbook.title_ru
      FROM objects
      JOIN objects_handbook ON objects.type = objects_handbook.id
      WHERE zone_id = $1
    ) AS agg GROUP BY title_ru, type ORDER BY type
  `;

  const result = await db_query(sql, [zone_id]);

  res.send(result.map((it, idx) => ({ ...it, color: COLORS[idx], selected: true })));
});

module.exports = router;
