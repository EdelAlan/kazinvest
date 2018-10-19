const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');
const bcrypt = require('bcrypt');

router.post('/', bodyparser.json(), (req, res) => {
  const { userid, password, firstname, lastname, zone, role } = req.body;
  if (userid && password && firstname && lastname && zone && role) {
    return bcrypt.hash(password, 10)
    .then(async hash => {
      await db_query(`
        INSERT INTO member (
          member_id,
          member_password,
          member_firstname,
          member_lastname,
          member_zone,
          member_role
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `, [userid, hash, firstname, lastname, zone, role]);
      res.json({
        msg: 'signup success',
      });
    });
  }
  res.status(404).json({
    msg: 'signup error',
  });
});

module.exports = router;
