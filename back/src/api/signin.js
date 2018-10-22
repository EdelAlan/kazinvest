const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const redis = require('../util/redis');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password } = req.body;
  if (userid.length > 0 && password.length > 0) {
    const sql = `SELECT * FROM member WHERE member_id = $1 AND member_verification = '1'`;
    const paramms = [userid];
    const user = (await db_query(sql, paramms))[0];
    if (!user) {
      return res.status(404).json({
        msg: 'user not found or not verified',
      });
    }
    return bcrypt.compare(password, user.member_password)
    .then(bool => {
      if (!bool) return res.status(404).json({
        msg: 'user wrong password',
      });
      let ttl = new Date();
      const death_time = ttl.setDate(ttl.getDate() + 1);
      const sessiontoken = cryptr.encrypt(JSON.stringify({
        userid,
        password: user.member_password,
        death_time,
      }));
      redis.set(userid, sessiontoken);
      return res.json({
        msg: 'user enter',
        sessiontoken,
      });
    });
  } 
  return res.status(404).json({
    msg: 'userid and password in body aren\'t exists',
  });
});

module.exports = router;
