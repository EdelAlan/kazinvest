const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');



router.get('/', async (req, res) => {
  const { zone_id } = req.query;
  const sql = `
    SELECT project_type 
    FROM  sectors 
    WHERE zone_id = $1
    GROUP BY project_type 
    ORDER BY project_type
  `;

  const result = await db_query(sql, [zone_id]);
  
  res.send(result.map(it => {
    if (it.project_type == 1) {
      it.title_ru = 'Действующий проект'
      it.title_en = 'Ongoing project'
      it.title_kz = 'Ағымдағы жоба'
      it.color = '#10C6FF';
    }
    if (it.project_type == 2) {
      it.title_ru = 'Проект на стадии реализации'
      it.title_en = 'The project is underway'
      it.title_kz = 'Жоба іске асырылуда'
      it.color = '#FFE03B';
    }
    if (it.project_type == 3) {
      it.title_ru = 'Свободный участок'
      it.title_en = 'Free land'
      it.title_kz = 'Бос жер телімі'
      it.color = '#03E334';
    }
    return {
      ...it,
      selected: true,
    };
  }).slice(0, 3));

});

module.exports = router;
