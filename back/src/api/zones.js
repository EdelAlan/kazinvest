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
  const { zone_type } = req.query;
  // Перечисление полей нужно для того, чтобы
  // не хранить на фронте кучу ненужных полей
  return res.send(await db_query(`
      SELECT ${FIELDS}, (
        SELECT COUNT(*) AS object_count 
        FROM sectors 
        WHERE zone.id = sectors.zone_id
      ) FROM zone ${
        // FIXME:  отрефакторить
        !zone_type || zone_type == 3 
        ? 'WHERE zone_type = 1 OR zone_type = 2' 
        : 'WHERE zone_type = $1'
      }
    `,
    !zone_type || zone_type == 3 ? [] : [zone_type],
  ));
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
