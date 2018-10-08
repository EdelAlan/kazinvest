const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const COLORS = [
  'rgba(69, 139, 116, 1)',
  'rgba(205, 197, 191, 1)',
  'rgba(113, 113, 198, 1)',
  'rgba(237, 145, 33, 1)',
  'rgba(205, 179, 139, 1)',
  'rgba(238, 201, 0, 1)',
  'rgba(139, 137, 112, 1)',
  'rgba(255, 193, 37, 1)',
  'rgba(238, 238, 0, 1)',
  'rgba(238, 238, 0, 1)',
  'rgba(118, 238, 0, 1)',
  'rgba(78, 238, 148, 1)',
  'rgba(252, 230, 201, 1)',
];

const FIELDS = `
  id,
  title_ru,
  title_kz,
  title_en
`;

router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  const sql = `
    SELECT type, title_ru  
    FROM (
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
