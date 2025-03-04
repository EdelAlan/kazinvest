const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');
const bodyparser = require('body-parser');
const mailer = require('../util/mailer');

const FIELDS = `
  member_id,
  member_verification,
  member_timestamp,
  member_firstname,
  member_lastname,
  member_role,
  member_zone
`;

router.get('/', async (_, res) => {
  const result = (await db_query(`
    SELECT ${FIELDS} FROM member 
    ORDER BY member_verification ASC, member_firstname ASC
  `)).map(it => ({
    ...it,
    member_zone: it.member_zone ? {
      id: it.member_zone.id,
      title_ru: it.member_zone.title_ru,
      title_en: it.member_zone.title_en,
      title_kz: it.member_zone.title_kz,
      industries_id: it.member_zone.industries_id,
    } : null
  }));
  res.send(result)
});

router.put('/:id', bodyparser.json(), async (req, res) => {
  const {
    member_verification,
    member_id,
    member_role,
  } = req.body;

  await db_query(`
    UPDATE member SET 
      member_verification = $1,
      member_role = $2
    WHERE 
      member_id = $3
  `, 
    [
      member_verification,
      member_role,
      member_id,
    ],
  );
  if (member_id.includes('@')) {
    let text = 'Ваш профиль ' + member_id + (member_verification ? ' активирован' : ' деактивирован');
    await mailer(member_id, 'Обновление статуса', text).then(res => console.log('mailer res: ' + res));
  }

  return res.json({
    member_updated: member_id,
  });
});

module.exports = router;
