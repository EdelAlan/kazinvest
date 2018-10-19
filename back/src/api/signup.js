const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const bcrypt = require('bcrypt');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password, firstname, lastname, zoneid, role } = req.body;
  console.log(req.body);
  
  // salt = zoneid
  if (userid && password && firstname && lastname && zoneid && role) {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return console.log(err);
      }
      const sql = `
        INSERT INTO member (
          member_id,
          member_password,
          member_firstname,
          member_lastname,
          member_zoneid,
          member_role
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const paramms = [userid, hash, firstname, lastname, zoneid, role];
      await db_query(sql, paramms);
    });
    return res.json({
      msg: 'signup success',
    });
  }
  return res.status(404).json({
    msg: 'signup error',
  });
});

module.exports = router;
