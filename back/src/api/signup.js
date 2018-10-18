const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password, firstname, lastname, zoneid, role } = req.body;
  console.log(req.body)
  
  if (userid && password && firstname && lastname && zoneid && role) {
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
    const paramms = [userid, password, firstname, lastname, zoneid, role];
    await db_query(sql, paramms);
    return res.json({
      msg: 'signup success',
    });
  } 
  return res.status(404).json({
    msg: 'signup error',
  });
});

module.exports = router;
