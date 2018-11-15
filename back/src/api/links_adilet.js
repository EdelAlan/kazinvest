const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');

router.get('/', async (_, res) => {
  res.send(await db_query(
    `SELECT * FROM links_adilet`,
  ));
});

router.put('/', body_parser.json(), async (req, res) => {

  const to_adilet = Object.keys(JSON.parse(JSON.stringify({ ...req.body }))).map(key => {
    return JSON.parse(JSON.stringify({ ...req.body }))[key];
  });
  
  to_adilet.forEach(async it => {
    const keys = Object.keys(it);
    keys.shift();

    const values = Object.keys(JSON.parse(JSON.stringify({ ...it, id: undefined }))).map(key => {
      return it[key];
    });

    const sql = `
      UPDATE links_adilet SET
        ${keys.map((key, idx) => {
          return key + ' = $' + (++idx)
        }).join(', ')}
      WHERE links_adilet.id = ${it.id}
    `;

    return await db_query(sql, [...values])
    .catch (err => {
      console.err(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
  });

  res.json({
    msg: 'links adilet updated',
  });
});

module.exports = router;