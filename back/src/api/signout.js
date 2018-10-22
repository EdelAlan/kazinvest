const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const redis = require('../util/redis');

router.post('/', bodyparser.json(), async (req, res) => {
  redis.del(req.body.userid);
  return res.json({
    msg: 'deleted token from redis',
  })
});

module.exports = router;
