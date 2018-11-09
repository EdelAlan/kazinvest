const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');


router.get('/', async (_, res) => res.send(await db_query(`SELECT * FROM feedback`)));

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
  .then(_ => res.json({
      msg: 'feedback sent',
  })).catch(err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });
});

module.exports = router;
