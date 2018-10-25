const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');
const bodyparser = require('body-parser');

const FIELDS = `
  member_id,
  member_verification,
  member_timestamp,
  member_firstname,
  member_lastname
`;

router.get('/', async (_, res) => res.send(await db_query(`
  SELECT ${FIELDS} FROM member 
  WHERE NOT member_role = 'superadmin'
  ORDER BY member_verification ASC, member_firstname ASC
`)));

router.put('/:id', bodyparser.json(), async (req, res) => {
  const {
    member_verification,
    member_firstname,
    member_lastname,
    member_id,
  } = req.body;

  await db_query(`
    UPDATE member SET 
      member_verification = $1,
      member_firstname = $2,
      member_lastname = $3,
      member_id = $4
    WHERE 
      member_id = $4
  `, 
    [
      member_verification,
      member_firstname,
      member_lastname,
      member_id,
    ],
  );
  return res.json({
    member_updated: member_id,
  });
});

module.exports = router;
