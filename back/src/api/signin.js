const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');  // только для post нужен
const db_query = require('../util/db_query');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password } = req.body;
  if (userid && password) {
    const sql = `SELECT * FROM member WHERE member_id = $1`;
    const paramms = [];
    await db_query(sql, paramms);

    return res.json({
      msg: 'user enter',
    });
  } 
  return res.status(404).json({
    msg: 'user not enter',
  });
});

module.exports = router;
