const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');
const mailer = require('../util/mailer');

router.get('/:selected_tab', async (req, res) => {
    console.log(req.params.selected_tab)
    switch (req.params.selected_tab) {
        case '1':
            console.log('case 1');
            return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'not_verified' ORDER BY id DESC`));
        case '2':
            console.log('case 2');
            return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'allowed' ORDER BY id DESC`));
        case '3':
            console.log('case 3');
            return res.send(await db_query(`SELECT * FROM new_data WHERE state = 'rejected' ORDER BY id DESC`));
    }
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
    ).then(async _ => {
        const admins = await db_query(`SELECT member_id FROM member WHERE member_role = 'superadmin'`);
        admins.forEach(async el => {
            if (el.member_id.includes('@')) {
                let text = 'Новая заявка на подтверждение редактирования зоны от: ' + member_id + ', ' 
                    + member_firstname + ' ' + member_lastname + '\n'
                    + 'Наименование зоны: ' + origin_title_ru;
                await mailer(el.member_id, 'Редактирование зоны',  text).then(res => console.log('mailer res: ' + res));
            }
        });
        res.json({
            msg: 'new data zone updated',
        });
    }).catch(err => {
        console.err(err);
        res.status(500).json({
            msg: 'something broke',
        });
    });
});

router.put('/sector', body_parser.json({
    limit: '100mb'
}), async (req, res) => {
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
    ).then(async _ => {
        const admins = await db_query(`SELECT member_id FROM member WHERE member_role = 'superadmin'`);
        admins.forEach(async el => {
            if (el.member_id.includes('@')) {
                let text = 'Новая заявка на подтверждение редактирования сектора от: ' + member_id + ', ' 
                    + member_firstname + ' ' + member_lastname + '\n'
                    + 'Наименование сектора: ' + origin_title_ru;
                await mailer(el.member_id, 'Редактирование сектора',  text).then(res => console.log('mailer res: ' + res));
            }
        });
        res.json({
            msg: 'sectors new data updated',
        });
    }).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'something broke',
            });
        });
});

router.put('/infrastructure', body_parser.json(), async (req, res) => {
    const {
        new_data,
        old_data,
        last_updated_member,
        last_updated_date,
        origin_title_ru,
        origin_title_en,
        origin_title_kz,
    } = req.body.infrastructure;
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
            'inf', 
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
    ).then(async _ => {
        const admins = await db_query(`SELECT member_id FROM member WHERE member_role = 'superadmin'`);
        admins.forEach(async el => {
            if (el.member_id.includes('@')) {
                let text = 'Новая заявка на подтверждение редактирования инфраструктуры от: ' + member_id + ', ' 
                    + member_firstname + ' ' + member_lastname + '\n'
                    + 'Наименование инфраструктуры: ' + new_data.title_ru;
                await mailer(el.member_id, 'Редактирование инфраструктуры',  text).then(res => console.log('mailer res: ' + res));
            }
        });
        res.json({
            msg: 'new data infrastructure updated',
        });
    }).catch(err => {
        console.err(err);
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