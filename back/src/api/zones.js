const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  id,
  status,
  zone_type,
  zone_time,
  title_ru,
  title_en,
  title_kz,
  industries_id,
  description_ru,
  description_kz,
  description_en,
  contacts_ru,
  created_date,
  budget_need,
  budget_allocated,
  user_id,
  map,
  ST_AsGeoJson(zone.geom)
`;

router.get('/', async (req, res) => {
  const { zone_filter, industries_filter, search_string, lang } = req.query;
  const sql = `
    SELECT ${FIELDS}, (
      SELECT COUNT(*) AS object_count
      FROM sectors
      WHERE zone.id = sectors.zone_id
    ) FROM zone
    ${zone_filter ?
      'WHERE zone_type IN (' +
      JSON.parse(zone_filter)
      .map((_, key) => '$' + ++key) + ')' : ''}
    ${industries_filter ?
      ((zone_filter ? 'AND ' : 'WHERE ') + 'industries_id IN (' + 
      JSON.parse(industries_filter)
      .map((_, key) => '$' + (++key + (zone_filter ?  + JSON.parse(zone_filter).length : 0) )) + ')') : ''}
    ${search_string ?
      ((zone_filter || industries_filter ? 'AND ' : 'WHERE ') + 'title_' + lang + ' LIKE ' + '\'%' + search_string + '%\' OR description_' + lang + ' LIKE \'%' + search_string + '%\'') : ''} 
      ORDER BY object_count DESC
  `;
  const params = 
    (zone_filter && industries_filter) ? 
      JSON.parse(zone_filter).concat(JSON.parse(industries_filter)) :
    zone_filter ? JSON.parse(zone_filter) :
    industries_filter ? JSON.parse(industries_filter) : [];
    
  console.log(sql);
  console.log(lang);
  console.log('zone_filter: ' + zone_filter);
  console.log('industries_filter: ' + industries_filter);
  return res.send(await db_query(sql, params));
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(`
      SELECT ${FIELDS} 
      FROM zone 
      WHERE id = $1
    `,
    [req.params.id],
  ));
});

module.exports = router;
