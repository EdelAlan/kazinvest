const router = require('express-async-router').AsyncRouter();
const bodyparser = require('body-parser');
const db_query = require('../util/db_query');

router.post('/', bodyparser.json(), async (req, res) => {
    if (req.body.st_asgeojson.type == 'Feature') {
        if (req.body.st_asgeojson.geometry.type == 'MultiLineString') {
            await db_query(`
                UPDATE infrastructures
                SET geom = ST_SetSRID(ST_GeomFromGeoJSON($1), 4326), capacity = ($2), unit = ($3)
                WHERE id = ($4)
              `, [req.body.st_asgeojson.geometry, req.body.capacity, req.body.unit, req.body.id])
                .then(_ => res.json({
                    msg: 'geom updated',
                })).catch(err => {
                    console.err(err);
                    res.status(500).json({
                        msg: 'something broke',
                    });
                });
        } else {
            console.log(req.body)
            await db_query(`
                UPDATE objects
                SET geom = ST_SetSRID(ST_GeomFromGeoJSON($1), 4326), capacity = ($2), unit = ($3)
                WHERE id = ($4)
              `, [req.body.st_asgeojson.geometry, req.body.capacity, req.body.unit, req.body.id])
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

router.post('/new', bodyparser.json(), async (req, res) => {
    if (req.body.type == 'inf') {
        console.log(req.body.geom)
        await db_query(`
            INSERT INTO infrastructures (
                zone_id,
                geom,
                title_ru,
                title_en,
                title_kz,
                capacity,
                unit
            ) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2),4326), $3, $4, $5, $6, $7)
          `, [req.body.zone_id, req.body.st_asgeojson.geometry, req.body.title_ru, req.body.title_en, req.body.title_kz, req.body.capacity, req.body.unit])
            .then(_ => res.json({
                msg: 'geom created',
            })).catch(err => {
                console.err(err);
                res.status(500).json({
                    msg: 'something broke',
                });
            });
    } else if (req.body.type == 'obj') {
        console.log(req.body)
        await db_query(`
            INSERT INTO objects (
                zone_id,
                geom,
                title_ru,
                title_en,
                title_kz,
                capacity,
                unit
            ) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2),4326), $3, $4, $5, $6, $7)
          `, [req.body.zone_id, req.body.st_asgeojson.geometry, req.body.title_ru, req.body.title_en, req.body.title_kz, req.body.capacity, req.body.unit])
            .then(_ => res.json({
                msg: 'geom created',
            })).catch(err => {
                console.err(err);
                res.status(500).json({
                    msg: 'something broke',
                });
            });
    }
});

module.exports = router;