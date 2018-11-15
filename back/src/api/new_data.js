const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
    return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'not_verified' ORDER BY id DESC`));
});

router.get('/allowed', async (req, res) => {
    return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'allowed' ORDER BY id DESC`));
});
router.get('/rejected', async (req, res) => {
    return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'rejected' ORDER BY id DESC`));
});


router.put('/zone', body_parser.json({
    limit: '100mb'
}), async (req, res) => {
    const {
        new_data,
        old_data,
        last_updated_member,
        last_updated_date,
        origin_title_ru,
        origin_title_en,
        origin_title_kz,
    } = req.body.zone;
    const {
        member_id, 
        member_firstname, 
        member_lastname,
    } = req.body.member;
    const sql = `
        INSERT INTO new_data (
            new_data, 
            type, 
            member_id, 
            member_firstname, 
            member_lastname, 
            last_updated_member, 
            last_updated_date,
            origin_title_ru,
            origin_title_kz,
            origin_title_en,
            state,
            old_data
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    return await db_query(
        sql, 
        [   new_data, 
            'zone', 
            member_id, 
            member_firstname, 
            member_lastname, 
            last_updated_member, 
            last_updated_date, 
            origin_title_ru,
            origin_title_kz,
            origin_title_en, 
            'not_verified', 
            old_data, 
        ]
    ).then(_ => res.json({
        msg: 'new data zone updated',
    })).catch(err => {
        console.err(err);
        res.status(500).json({
            msg: 'something broke',
        });
    });
});

router.put('/sector', body_parser.json(), async (req, res) => {
    console.log(32423)
    const {
        new_data,
        old_data,
        last_updated_member,
        last_updated_date,
        origin_title_ru,
        origin_title_en,
        origin_title_kz,
    } = req.body.sector;
    const {
        member_id, 
        member_firstname, 
        member_lastname,
    } = req.body.member;
 
    const sql = `
        INSERT INTO new_data (
            new_data, 
            type, 
            member_id, 
            member_firstname, 
            member_lastname, 
            last_updated_member, 
            last_updated_date,
            origin_title_ru,
            origin_title_kz,
            origin_title_en,
            state,
            old_data
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    return await db_query(
        sql,
        [new_data,
            'sector',
            member_id,
            member_firstname,
            member_lastname,
            last_updated_member,
            last_updated_date,
            origin_title_ru,
            origin_title_kz,
            origin_title_en,
            'not_verified',
            old_data,
        ]        
    ).then(_ => res.json({
            msg: 'sectors new data updated',
        })).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'something broke',
            });
        });
});

router.put('/infrastructure', body_parser.json(), async (req, res) => {
    const {
        member_id, 
        member_firstname, 
        member_lastname,
    } = req.body.member;
    const to_infrastructure = JSON.parse(JSON.stringify({
        ...req.body.infrastructure,
    }));
    sql = `
        INSERT INTO new_data (new_data, type, member_id, member_firstname, member_lastname) 
        VALUES ($1, $2, $3, $4, $5)
    `;
    await db_query(sql, [to_infrastructure, 'inf', member_id, member_firstname, member_lastname])
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
        UPDATE new_data SET 
            state = 'rejected'
        WHERE 
            new_data.id = $1`;
    console.log(sql)
    console.log(req.params.id)
    return await db_query(sql, [req.params.id])
      .then(_ => res.json({
        msg: 'new data updated',
      })).catch (err => {
        console.err(err);
        res.status(500).json({
          msg: 'something broke',
        });
      });
  });

router.put('/allow/:id', body_parser.json(), async (req, res) => {
    const sql = `
        UPDATE new_data SET 
            state = 'allowed'
        WHERE 
            new_data.id = $1`;
    console.log(sql)
    console.log(req.params.id)
    return await db_query(sql, [req.params.id])
      .then(_ => res.json({
        msg: 'new data updated',
      })).catch (err => {
        console.err(err);
        res.status(500).json({
          msg: 'something broke',
        });
      });
  });

module.exports = router;