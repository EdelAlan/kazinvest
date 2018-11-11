const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');

const FIELDS = `
  sectors.id,
  sectors.project_type,
  sectors.zone_id,
  sectors.title_ru,
  sectors.title_kz,
  sectors.title_en,
  sectors.title_project_ru,
  sectors.title_project_kz,
  sectors.title_project_en,
  sectors.sef,
  sectors.file,
  sectors.contacts_ru,
  sectors.contacts_kz,
  sectors.contacts_en,
  sectors.products_ru,
  sectors.products_kz,
  sectors.products_en,
  sectors.project_date,
  sectors.area,
  sectors.time_realization_ru,
  sectors.time_realization_kz,
  sectors.time_realization_en,
  sectors.current_status_ru,
  sectors.current_status_kz,
  sectors.current_status_en,
  sectors.infrastructural_ru,
  sectors.infrastructural_kz,
  sectors.infrastructural_en,
  sectors.divisible,
  sectors.indicators_ru,
  sectors.indicators_kz,
  sectors.indicators_en,
  sectors.count_participant_current_project,
  sectors.count_participant_underway_project,
  sectors.count_participant_problem_project,
  sectors.project_price,
  sectors.foreign_participation,
  sectors.power,
  sectors.plan_jobs,
  sectors.status,
  sectors.user_updated,
  sectors.comment,
  ST_AsGeoJson(sectors.geom)
`;

router.get('/', async (req, res) => {
  const { zone_id, legend_filter, lang } = req.query;
  
  const sql = `
    SELECT ${FIELDS} FROM sectors 
    ${zone_id ? 'WHERE zone_id = $1' : ''}
    ${legend_filter ? ('AND project_type NOT IN (' +
      JSON.parse(legend_filter)
        .map((_, key) => '$' + (++key + 1))
      + ')') : ''}
    ORDER BY project_type ASC, title_${lang || 'ru'} 
  `;

  const params = zone_id && !legend_filter
    ? [zone_id] : zone_id && legend_filter
    ? [zone_id, ...JSON.parse(legend_filter)] : [];

  console.log(sql);
  console.log(params);
  let sectors = await db_query(sql, params);

  sectors = sectors.map(it => ({ 
    ...it, 
    project_type_title_ru: it.project_type == 1 ? 'Действующий' : it.project_type == 2 ? 'На стадии реализации' : 'Свободный',
    project_type_title_kz: it.project_type == 1 ? 'Ағымдағы жоба' : it.project_type == 2 ? 'Iске асырылуда' : 'Бос',
    project_type_title_en: it.project_type == 1 ? 'Ongoing' : it.project_type == 2 ? 'Underway' : 'Free',
  }));

  const sectors_videos = await db_query(
    'SELECT * FROM sector_videos',
  );
  const sectors_files = await db_query(
    'SELECT * FROM sector_files',
  );
  const sectors_photos = await db_query(
    'SELECT * FROM sector_photos',
  );

  sectors = sectors.map(sector => {
    return {
      ...sector,
      videos: sectors_videos
        .filter(vid => vid.sector_id == sector.id),
      files: sectors_files
        .filter(file => file.sector_id == sector.id),
      photos: sectors_photos
        .filter(photos => photos.sector_id == sector.id),
    };
  });

  res.send(sectors);

});

router.get('/:id', async (req, res) => {
  let sectors = await db_query(
    'SELECT * from sectors where id = $1',
    [req.params.id],
  );

  const sectors_videos = await db_query(
    'SELECT * FROM sector_videos',
  );
  const sectors_files = await db_query(
    'SELECT * FROM sector_files',
  );
  const sectors_photos = await db_query(
    'SELECT * FROM sector_photos',
  );

  sectors = sectors.map(sector => {
    return {
      ...sector,
      videos: sectors_videos
        .filter(vid => vid.sector_id == sector.id),
      files: sectors_files
        .filter(file => file.sector_id == sector.id),
      photos: sectors_photos
        .filter(photos => photos.sector_id == sector.id),
    };
  });

  res.send(sectors);

});

router.put('/:id', body_parser.json(), async (req, res) => {
  const to_investments = JSON.parse(JSON.stringify({
    2014: req.body.investments2014,
    2015: req.body.investments2015,
    2016: req.body.investments2016,
    2017: req.body.investments2017,
    2018: req.body.investments2018,
  }));
  Object.keys(to_investments).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_investments 
      WHERE qindicators_investments.parent_id = ${req.params.id}
      AND qindicators_investments.year = ${key}
    `);
    var value = parseInt(to_investments[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_investments SET val = $1
        WHERE qindicators_investments.parent_id = ${req.params.id} AND qindicators_investments.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_investments (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_foreign_investments = JSON.parse(JSON.stringify({
    2014: req.body.foreign_investments2014,
    2015: req.body.foreign_investments2015,
    2016: req.body.foreign_investments2016,
    2017: req.body.foreign_investments2017,
    2018: req.body.foreign_investments2018,
  }));
  Object.keys(to_foreign_investments).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_foreigninvestments 
      WHERE qindicators_foreigninvestments.parent_id = ${req.params.id}
      AND qindicators_foreigninvestments.year = ${key}
    `);
    var value = parseInt(to_foreign_investments[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_foreigninvestments SET val = $1
        WHERE qindicators_foreigninvestments.parent_id = ${req.params.id} AND qindicators_foreigninvestments.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_foreigninvestments (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_production = JSON.parse(JSON.stringify({
    2014: req.body.production2014,
    2015: req.body.production2015,
    2016: req.body.production2016,
    2017: req.body.production2017,
    2018: req.body.production2018,
  }));
  Object.keys(to_production).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_bulkproductions 
      WHERE qindicators_bulkproductions.parent_id = ${req.params.id}
      AND qindicators_bulkproductions.year = ${key}
    `);
    var value = parseInt(to_production[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_bulkproductions SET val = $1
        WHERE qindicators_bulkproductions.parent_id = ${req.params.id} AND qindicators_bulkproductions.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_bulkproductions (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_number_jobs = JSON.parse(JSON.stringify({
    2014: req.body.number_jobs2014,
    2015: req.body.number_jobs2015,
    2016: req.body.number_jobs2016,
    2017: req.body.number_jobs2017,
    2018: req.body.number_jobs2018,
  }));
  Object.keys(to_number_jobs).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_numberjobs 
      WHERE qindicators_numberjobs.parent_id = ${req.params.id}
      AND qindicators_numberjobs.year = ${key}
    `);
    var value = parseInt(to_number_jobs[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_numberjobs SET val = $1
        WHERE qindicators_numberjobs.parent_id = ${req.params.id} AND qindicators_numberjobs.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_numberjobs (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_taxes = JSON.parse(JSON.stringify({
    2014: req.body.taxes2014,
    2015: req.body.taxes2015,
    2016: req.body.taxes2016,
    2017: req.body.taxes2017,
    2018: req.body.taxes2018,
  }));
  Object.keys(to_taxes).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_bulktaxes 
      WHERE qindicators_bulktaxes.parent_id = ${req.params.id}
      AND qindicators_bulktaxes.year = ${key}
    `);
    var value = parseInt(to_taxes[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_bulktaxes SET val = $1
        WHERE qindicators_bulktaxes.parent_id = ${req.params.id} AND qindicators_bulktaxes.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_bulktaxes (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_export_volumes = JSON.parse(JSON.stringify({
    2014: req.body.exports_volume2014,
    2015: req.body.exports_volume2015,
    2016: req.body.exports_volume2016,
    2017: req.body.exports_volume2017,
    2018: req.body.exports_volume2018,
  }));
  Object.keys(to_export_volumes).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_exports_volume 
      WHERE qindicators_exports_volume.parent_id = ${req.params.id}
      AND qindicators_exports_volume.year = ${key}
    `);
    var value = parseInt(to_export_volumes[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_exports_volume SET val = $1
        WHERE qindicators_exports_volume.parent_id = ${req.params.id} AND qindicators_exports_volume.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_exports_volume (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  const to_spent_foreign_investments = JSON.parse(JSON.stringify({
    2014: req.body.spent_foreign_investments2014,
    2015: req.body.spent_foreign_investments2015,
    2016: req.body.spent_foreign_investments2016,
    2017: req.body.spent_foreign_investments2017,
    2018: req.body.spent_foreign_investments2018,
  }));
  Object.keys(to_spent_foreign_investments).map(async key => {
    var s = await db_query(`SELECT parent_id FROM qindicators_sfi
      WHERE qindicators_sfi.parent_id = ${req.params.id}
      AND qindicators_sfi.year = ${key}
    `);
    var value = parseInt(to_spent_foreign_investments[key],10);

    if (s[0]) {
      const sql = `
        UPDATE qindicators_sfi SET val = $1
        WHERE qindicators_sfi.parent_id = ${req.params.id} AND qindicators_sfi.year = ${key}
      `;
      await db_query(sql, [value])
    } else {
      const sql = `
        INSERT INTO qindicators_sfi (parent_id, year, val) 
        VALUES ($1 , $2, $3)
      `;
      await db_query(sql, [req.params.id, key, value]);
    }
  });

  console.log(req.body.geom)
  const sql_geom = `
    UPDATE sectors SET geom = ST_GeomFromGeoJSON( $1 )
    WHERE sectors.id = ${req.params.id}
  `;
  await db_query(sql_geom, req.body.geom.features ? [req.body.geom.features[0].geometry] : [req.body.geom.geometry]);

  const to_sectors = JSON.parse(JSON.stringify({
    ...req.body,
    geom: undefined,
    st_asgeojson: undefined,
    files: undefined,
    videos: undefined,
    photos: undefined,

    investments2014: undefined,
    investments2015: undefined,
    investments2016: undefined,
    investments2017: undefined,
    investments2018: undefined,

    production2014: undefined,
    production2015: undefined,
    production2016: undefined,
    production2017: undefined,
    production2018: undefined,

    foreign_investments2014: undefined,
    foreign_investments2015: undefined,
    foreign_investments2016: undefined,
    foreign_investments2017: undefined,
    foreign_investments2018: undefined,

    number_jobs2014: undefined,
    number_jobs2015: undefined,
    number_jobs2016: undefined,
    number_jobs2017: undefined,
    number_jobs2018: undefined,

    taxes2014: undefined,
    taxes2015: undefined,
    taxes2016: undefined,
    taxes2017: undefined,
    taxes2018: undefined,

    exports_volume2014: undefined,
    exports_volume2015: undefined,
    exports_volume2016: undefined,
    exports_volume2017: undefined,
    exports_volume2018: undefined,

    spent_foreign_investments2014: undefined,
    spent_foreign_investments2015: undefined,
    spent_foreign_investments2016: undefined,
    spent_foreign_investments2017: undefined,
    spent_foreign_investments2018: undefined,
  }));
  const to_sectors_values = Object.keys(to_sectors).map(key => {
    return to_sectors[key];
  });
  const sql = `
    UPDATE sectors SET
      ${Object.keys(to_sectors).map((key, idx) => {
        return key + ' = $' + (++idx)
      }).join(', ')}
    WHERE sectors.id = ${req.params.id}
  `;
  await db_query(sql, [...to_sectors_values])
    .then(_ => res.json({
      msg: 'sectors updated',
    })).catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
});

module.exports = router;
