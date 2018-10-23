const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const redis = require('../util/redis');

router.post('/', bodyparser.json(), async (req, res) => {
  const { sessiontoken } = req.body;
  const { userid, password, death_time } = JSON.parse(cryptr.decrypt(sessiontoken));
  
  const redis_token = await new Promise((resolve, reject) => {
    redis.get(userid, (_, reply) => {
      resolve(reply);
    });
  }).then(it => it);

  if (!redis_token) {
    return res.status(404).json({
      msg: 'hello, hacker :)'
    });
  }
  
  if (!redis_token == sessiontoken) {
    return res.status(500).json({
      msg: 'tokens are not match'
    });  
  }

  let today = new Date();
  today = today.setDate(today.getDate());

  if (death_time < today) {
    return res.status(404).json({
      msg: 'session is done'
    });
  }

  const sql = `SELECT * FROM member WHERE member_id = $1 AND member_password = $2`;
  const paramms = [userid, password];
  const user = (await db_query(sql, paramms))[0];
  const {
    member_id,
    member_firstname,
    member_lastname,
    member_role,
    member_zone,
  } = user;
  return res.json({
    msg: 'session is actual',
    user: {
      member_id,
      member_firstname,
      member_lastname,
      member_role,
      member_zone,
    },
  });
});

module.exports = router;
