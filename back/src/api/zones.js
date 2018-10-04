const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  zone.id,
  zone.status,
  zone.zone_type,
  zone.title_ru,
  zone.industries_id,
  zone.zone_time,
  zone.description_ru,
  zone.contacts_ru,
  zone.polygonfield,
  zone.created_date,
  zone.map,
  zone.budget_need,
  zone.budget_allocated,
  zone.user_id
`;

router.get('/', async (req, res) => {
  const sql = `
    SELECT ${FIELDS}, (
      SELECT COUNT(*) AS object_count 
      FROM sectors 
      WHERE zone.id = sectors.zone_id
    ) FROM zone 
    ${req.query.zone_filter ? 
      'WHERE zone_type IN (' + 
      JSON.parse(req.query.zone_filter)
      .map((it, key) => '$' + ++key) + ')' : ''}
    ${req.query.industries_filter ? 
      ('AND industries_id IN (' + 
      JSON.parse(req.query.industries_filter)
      .map((it, key) => '$' + (++key + (req.query.zone_filter ?  + JSON.parse(req.query.zone_filter).length : 0) )) + ')') : ''}
  `;
  const params = 
    (req.query.zone_filter && req.query.industries_filter) ? 
      JSON.parse(req.query.zone_filter).concat(JSON.parse(req.query.industries_filter)) :
    req.query.zone_filter ? JSON.parse(req.query.zone_filter) :
    req.query.industries_filter ? JSON.parse(req.query.industries_filter) : [];
    
  console.log(sql);
  console.log(params);
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
