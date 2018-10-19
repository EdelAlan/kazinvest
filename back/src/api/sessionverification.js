const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

router.post('/', bodyparser.json(), async (req, res) => {
  const { sessiontoken } = req.body;
  const { userid, password, death_time } = JSON.parse(cryptr.decrypt(sessiontoken));

  let today = new Date();
  today = today.setDate(today.getDate());

  if (death_time < today) {
    return res.json({
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
