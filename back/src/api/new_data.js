const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
    return res.send(await db_query('SELECT * FROM new_data'));
});


router.put('/zone', body_parser.json({
    limit: '100mb'
}), async (req, res) => {
    const {
        member_id, 
        member_firstname, 
        member_lastname,
    } = req.body.member;
    const to_zone = JSON.parse(JSON.stringify({
        ...req.body.zone,
    }));
    const sql = `
        INSERT INTO new_data (model, type, member_id, member_firstname, member_lastname)
        VALUES ($1, $2, $3, $4, $5)
    `;
    return await db_query(sql, [to_zone, 'zone', member_id, member_firstname, member_lastname ])
    .then(_ => res.json({
        msg: 'new data zone updated',
    })).catch(err => {
        console.err(err);
        res.status(500).json({
            msg: 'something broke',
        });
    });
});

router.put('/sector', body_parser.json(), async (req, res) => {
    const to_sector = JSON.parse(JSON.stringify({
        ...req.body,
    }));
    sql = `
    INSERT INTO new_data (model, type) 
    VALUES ($1 , $2)
  `;
    await db_query(sql, [to_sector, 'sector'])
        .then(_ => res.json({
            msg: 'sectors new data updated',
        })).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'something broke',
            });
        });
});

router.put('/infrastructure', body_parser.json(), async (req, res) => {
    const to_infrastructure = JSON.parse(JSON.stringify({
        ...req.body,
    }));
    sql = `
    INSERT INTO new_data (model, type) 
    VALUES ($1 , $2)
  `;
    await db_query(sql, [to_infrastructure, 'inf'])
        .then(_ => res.json({
            msg: 'infrastructure new data updated',
        })).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'something broke',
            });
        });
});

router.put('/reject/:id', body_parser.json(), async (req, res) => {
    const sql = `
      DELETE FROM new_data
      WHERE new_data.id = $1
    `;
    return await db_query(sql, [req.params.id])
      .then(_ => res.json({
        msg: 'new data deleted',
      })).catch (err => {
        console.err(err);
        res.status(500).json({
          msg: 'something broke',
        });
      });
  });

module.exports = router;