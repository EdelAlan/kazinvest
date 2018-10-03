const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

const FIELDS = `
  industries.id,
  industries.title_ru,
  industries.title_en,
  industries.title_kz
`;

router.get('/', async (_, res) => {
  res.send(await db_query(
    `SELECT ${FIELDS} FROM industries`,
  ));
});

module.exports = router;