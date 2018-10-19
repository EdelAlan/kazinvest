const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password } = req.body;
  if (userid && password) {
    const sql = `SELECT * FROM member WHERE member_id = $1`;
    const paramms = [userid];
    const user = (await db_query(sql, paramms))[0];
    if (!user) return res.status(404).json({
      msg: 'user not found',
    });
    return bcrypt.compare(password, user.member_password)
    .then(bool => {
      if (!bool) return res.status(404).json({
        msg: 'user wrong password',
      });
      let ttl = new Date();
      const death_time = ttl.setDate(ttl.getDate() + 1);
      const sessiontoken = cryptr.encrypt(`{
        userid: ${userid},
        password: ${password},
        death_time: ${death_time},
      }`);
      // console.log(cryptr.decrypt(sessiontoken))
      return res.json({
        msg: 'user enter',
        sessiontoken,
      });
    });
  } 
  return res.status(404).json({
    msg: 'userid and password aren\'t exists',
  });
});

module.exports = router;
