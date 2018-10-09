const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  sectors.id,
  sectors.project_type,
  sectors.zone_id,
  sectors.title_ru,
  sectors.title_kz,
  sectors.title_en,
  sectors.title_project_ru,
  sectors.title_project_kz,
  sectors.title_project_en,
  sectors.sef,
  sectors.file,
  sectors.contacts_ru,
  sectors.contacts_kz,
  sectors.contacts_en,
  sectors.products_ru,
  sectors.products_kz,
  sectors.products_en,
  sectors.project_date,
  sectors.area,
  sectors.time_realization_ru,
  sectors.time_realization_kz,
  sectors.time_realization_en,
  sectors.current_status_ru,
  sectors.current_status_kz,
  sectors.current_status_en,
  sectors.infrastructural_ru,
  sectors.infrastructural_kz,
  sectors.infrastructural_en,
  sectors.divisible,
  sectors.indicators_ru,
  sectors.indicators_kz,
  sectors.indicators_en,
  sectors.count_participant_current_project,
  sectors.count_participant_underway_project,
  sectors.count_participant_problem_project,
  sectors.project_price,
  sectors.foreign_participation,
  sectors.power,
  sectors.plan_jobs,
  sectors.status,
  sectors.user_updated,
  sectors.comment,
  ST_AsGeoJson(sectors.geom)
`;

router.get('/', async (req, res) => {
  const { zone_id, legend_filter } = req.query;
  
  const sql = `
    SELECT ${FIELDS} FROM sectors 
    ${zone_id ? 'WHERE zone_id = $1' : ''}
    ${legend_filter ? ('AND project_type IN (' +
      JSON.parse(legend_filter)
        .map((_, key) => '$' + (++key + 1))
      + ')') : ''}
    ORDER BY LENGTH(title_project_ru) DESC
  `;

  const params =
    zone_id && !legend_filter
      ? [zone_id] :
      zone_id && legend_filter
        ? [zone_id, ...JSON.parse(legend_filter)]
        : [];

  console.log(sql);
  console.log(params);
  res.send(await db_query(sql, params));
});

router.get('/:id', async (req, res) => {
  res.send(await db_query(
    'SELECT * from sectors where id = $1',
    [req.params.id],
  ));
});

module.exports = router;
