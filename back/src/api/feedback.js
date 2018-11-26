const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const mailer = require('../util/mailer');


router.get('/', async (_, res) => res.send(await db_query(`SELECT * FROM feedback WHERE is_read = FALSE`)));

router.post('/', bodyparser.json(), async (req, res) => {
  const { email, message, file, member_id } = req.body;

  console.log(file)
  
  await db_query(`
    INSERT INTO feedback (
      email,
      message,
      member_id,
      file
    ) VALUES ($1, $2, $3, $4)
  `, [email, message, member_id, file])
  .then(async _ => {
    const admins = await db_query(`SELECT member_id FROM member WHERE member_role = 'superadmin'`);
    admins.forEach(async el => {
      if (el.member_id.includes('@')) {
        let text = 'Новое сообщение обратной связи от: ' + member_id + '. E-mail: ' + email + '\n'
          + 'Сообщение: ' + message;
        await mailer(el.member_id, 'Обратная связь',  text).then(res => console.log('mailer res: ' + res));
      }
    });
    res.json({ msg: 'feedback sent', });
  }).catch(err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });
});

router.post('/answer', bodyparser.json(), async (req, res) => {
  const { answer, email, message, file, member_id, id } = req.body;
  
  await db_query(`
    UPDATE feedback SET 
      is_read = TRUE
    WHERE 
      id = $1
  `, [id])
  .then(async _ => {
    if (email.includes('@')) {
      let text = 'Ваше сообщение: ' + message + '\n'
        + 'Ответ: ' + answer;
      await mailer(email, 'Обратная связь',  text).then(res => console.log('mailer res: ' + res));
    }
    res.json({ msg: 'feedback answered', });
  }).catch(err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });
});

module.exports = router;
