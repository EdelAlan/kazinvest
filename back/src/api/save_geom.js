const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');

router.post('/', bodyparser.json(), async (req, res) => {
    if (req.body.geom.type == 'Feature') {
        if (req.body.type <= 12) {
            await db_query(`
                UPDATE infrastructures
                SET geom = ST_GeomFromGeoJSON($1), capacity = ($2), unit = ($3)
                WHERE id = ($4)
              `, [req.body.geom.geometry, req.body.capacity, req.body.unit, req.body.id])
                .then(_ => res.json({
                    msg: 'geom updated',
                })).catch(err => {
                    console.err(err);
                    res.status(500).json({
                        msg: 'something broke',
                    });
                });
        } else {
            await db_query(`
                UPDATE objects
                SET geom = ST_GeomFromGeoJSON($1), capacity = ($2), unit = ($3)
                WHERE id = ($4)
              `, [req.body.geom.geometry, req.body.capacity, req.body.unit, req.body.id])
                .then(_ => res.json({
                    msg: 'geom updated',
                })).catch(err => {
                    console.err(err);
                    res.status(500).json({
                        msg: 'something broke',
                    });
                });
        }
    }
});

module.exports = router;