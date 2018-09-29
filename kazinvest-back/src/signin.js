const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');  // только для post нужен
const db_query = require('./util/db_query');

router.post('/', bodyparser.json(), async (req, res) => {
  const { userid, password } = req.body;
  if (userid == 'admin' && password == 'admin') {
    return res.json({
      msg: 'user enter',
    });
  } 
  return res.status(404).json({
    msg: 'user not enter',
  });;
});

module.exports = router;
