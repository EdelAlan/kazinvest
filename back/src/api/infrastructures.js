const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  id,
  title_ru,
  title_en,
  title_kz,
  zone_id,
  status,
  type,
  created_date,
  ST_AsGeoJson(geom),
  capacity,
  unit
`;

router.get('/', async (req, res) => {
  const { zone_id, legend_filter } = req.query;
  
  const sql = `
    SELECT ${FIELDS} FROM infrastructures 
    ${zone_id ? 'WHERE zone_id = $1' : ''}
    ${legend_filter ? ('AND type NOT IN (' + 
      JSON.parse(legend_filter)
      .map((_, key) => '$' + (++key + 1))
    + ')') : ''}
  `;

  const params = 
    zone_id && !legend_filter 
    ? [zone_id] :
    zone_id && legend_filter 
    ? [zone_id, ...JSON.parse(legend_filter)] 
    : [];
  
  console.log(sql)
  console.log(params)

  res.send(await db_query(sql, params));
});

module.exports = router;
