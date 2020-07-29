const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');
const decodebase64img = require('../util/decodebase64img');
const fs = require('fs');
// const zonefilespath = __dirname + '/../../../front/public/files/zones/';
// const zonefilespath = __dirname + '/../../../kazinvest/files/zones/'; 
const zonefilespath = __dirname + '/../../var/www/kazinvest/files/zones/'; 

const zone_type_str = [{
  "id": 1,
  "title_ru": "СЭЗ",
  "title_en": "SEZ",
  "title_kz": "АЭА"
}, {
  "id": 2,
  "title_ru": "ИЗ",
  "title_en": "IZ",
  "title_kz": "ИА"
}];

const FIELDS = `
  zone.id,
  zone.status,
  zone_type,
  zone_time,
  zone.title_ru,
  zone.title_en,
  zone.title_kz,
  zone.industries_id,
  zone.description_ru,
  zone.description_kz,
  zone.description_en,
  zone.region_description_ru,
  zone.region_description_kz,
  zone.region_description_en,
  zone.contacts_ru,
  zone.province_id,
  zone.contacts_kz,
  zone.contacts_en,
  created_date,
  budget_need,
  budget_allocated,
  last_updated_member,
  last_updated_date,
  user_id,
  map,
  level,
  provinces.provincename,
  ST_AsGeoJson(zone.geom)
`;

router.get('/', async (req, res) => {
  const { zone_filter, industries_filter, provinces_filter, search_string, lang } = req.query;
  const zone_f = zone_filter ? JSON.parse(zone_filter) : undefined;
  const industries_f = industries_filter ? JSON.parse(industries_filter) : undefined;
  const provinces_f = provinces_filter ? JSON.parse(provinces_filter) : undefined;
  const zone_l = zone_filter ? JSON.parse(zone_filter).length : 0;
  const industries_l = industries_filter ? JSON.parse(industries_filter).length : 0;
  const provinces_l = provinces_filter ? JSON.parse(provinces_filter).length : 0;
  const sql = `
    SELECT ${FIELDS}, (
      SELECT COUNT(*) AS object_count
      FROM sectors
      WHERE zone.id = sectors.zone_id
    ) FROM zone
    left join provinces
    ON zone.province_id = provinces.id
    ${zone_f || 
      industries_filter || 
      provinces_filter || 
      search_string ?
      'WHERE' : ''}
    ${[
      zone_f ?
      ('zone_type NOT IN (' +
      zone_f
      .map((_, key) => '$' + ++key) + ')') : null,

      industries_filter ?
      ('industries_id NOT IN (' + 
      industries_f
      .map((_, key) => '$' + (++key + zone_l)) + ')') : null,
  
      provinces_filter ?
      ('province_id NOT IN (' + 
      provinces_f
      .map((_, key) => '$' + (++key + zone_l + industries_l)) + ')') : null,
  
      search_string ? 
      ('zone.title_' + lang + ' LIKE ' + '\'%' + search_string + '%\'') : null

    ].filter(it => it != null).join('\nAND\n')}

    ORDER BY zone_type ASC, object_count DESC
  `;
  const params = 
    (zone_filter && industries_filter && provinces_filter) ? 
      zone_f.concat(industries_f).concat(provinces_f) :
    (zone_f && industries_filter) ?   
      zone_f.concat(industries_f) :
    (zone_f && provinces_filter) ? 
      zone_f.concat(provinces_f) :
    (industries_filter && provinces_filter) ? 
      industries_f.concat(provinces_f) :
    zone_filter ? zone_f : 
    industries_filter ? industries_f :
    provinces_filter ? provinces_f : 
    [];
  console.log(sql);
  console.log(params);
  console.log('lang:', lang);
  console.log('zone_filter:', zone_filter);
  console.log('industries_filter:', industries_filter);
  console.log('provinces_filter:', provinces_filter);
  console.log('search_string:', search_string);
  let zones = (await db_query(sql, params)).map(it => ({
    ...it,
    title_ru: zone_type_str[it.zone_type - 1].title_ru + ' ' + (it.title_ru || 'нет названия'),
    title_kz: zone_type_str[it.zone_type - 1].title_kz + ' ' + (it.title_kz || it.title_ru || 'нет названия'),
    title_en: zone_type_str[it.zone_type - 1].title_en + ' ' + (it.title_en || it.title_ru || 'нет названия'),
  }));
  const zones_videos = await db_query(
    'SELECT * FROM zone_videos',
  );
  const zones_files = await db_query(
    'SELECT * FROM zone_files',
  );
  const zones_photos = await db_query(
    `SELECT * FROM zone_photos`,
  );
  zones = zones.map(zone => {
    return {
      ...zone,
      videos: zones_videos
        .filter(vid => vid.zone_id == zone.id),
      files: zones_files
        .filter(file => file.zone_id == zone.id),
      photos: zones_photos
        .filter(photos => photos.zone_id == zone.id),
    };
  });
  res.send(zones);
});


router.get('/:id', async (req, res) => {
  const { zone_filter, industries_filter, provinces_filter, search_string, lang } = req.query;
  const zone_f = zone_filter ? JSON.parse(zone_filter) : undefined;
  const industries_f = industries_filter ? JSON.parse(industries_filter) : undefined;
  const provinces_f = provinces_filter ? JSON.parse(provinces_filter) : undefined;
  const zone_l = zone_filter ? JSON.parse(zone_filter).length : 0;
  const industries_l = industries_filter ? JSON.parse(industries_filter).length : 0;
  const provinces_l = provinces_filter ? JSON.parse(provinces_filter).length : 0;
  const sql = `
    SELECT ${FIELDS}, (
      SELECT COUNT(*) AS object_count
      FROM sectors
      WHERE zone.id = sectors.zone_id
    ) FROM zone
    left join provinces
    ON zone.province_id = provinces.id
    ${zone_f || 
      industries_filter || 
      provinces_filter || 
      search_string ?
      'WHERE' : ''}
    ${[
      zone_f ?
      ('zone_type NOT IN (' +
      zone_f
      .map((_, key) => '$' + ++key) + ')') : null,

      industries_filter ?
      ('industries_id NOT IN (' + 
      industries_f
      .map((_, key) => '$' + (++key + zone_l)) + ')') : null,
  
      provinces_filter ?
      ('province_id NOT IN (' + 
      provinces_f
      .map((_, key) => '$' + (++key + zone_l + industries_l)) + ')') : null,
  
      search_string ? 
      ('zone.title_' + lang + ' LIKE ' + '\'%' + search_string + '%\'') : null

    ].filter(it => it != null).join('\nAND\n')}

    WHERE zone.id = ${req.params.id}
    ORDER BY zone_type ASC, object_count DESC
  `;
  const params = 
    (zone_filter && industries_filter && provinces_filter) ? 
      zone_f.concat(industries_f).concat(provinces_f) :
    (zone_f && industries_filter) ?   
      zone_f.concat(industries_f) :
    (zone_f && provinces_filter) ? 
      zone_f.concat(provinces_f) :
    (industries_filter && provinces_filter) ? 
      industries_f.concat(provinces_f) :
    zone_filter ? zone_f : 
    industries_filter ? industries_f :
    provinces_filter ? provinces_f : 
    [];
  console.log(sql);
  console.log(params);
  console.log('lang:', lang);
  console.log('zone_filter:', zone_filter);
  console.log('industries_filter:', industries_filter);
  console.log('provinces_filter:', provinces_filter);
  console.log('search_string:', search_string);
  let zones = (await db_query(sql, params)).map(it => ({
    ...it,
    title_ru: zone_type_str[it.zone_type - 1].title_ru + ' ' + (it.title_ru || 'нет названия'),
    title_kz: zone_type_str[it.zone_type - 1].title_kz + ' ' + (it.title_kz || it.title_ru || 'нет названия'),
    title_en: zone_type_str[it.zone_type - 1].title_en + ' ' + (it.title_en || it.title_ru || 'нет названия'),
  }));
  const zones_videos = await db_query(
    'SELECT * FROM zone_videos',
  );
  const zones_files = await db_query(
    'SELECT * FROM zone_files',
  );
  const zones_photos = await db_query(
    `SELECT * FROM zone_photos`,
  );
  zones = zones.map(zone => {
    return {
      ...zone,
      videos: zones_videos
        .filter(vid => vid.zone_id == zone.id),
      files: zones_files
        .filter(file => file.zone_id == zone.id),
      photos: zones_photos
        .filter(photos => photos.zone_id == zone.id),
    };
  });
  res.send(zones);
});





router.put('/add', body_parser.json({ limit: '100mb' }), async (req, res) => {
  const to_zone = JSON.parse(JSON.stringify({
    ...req.body,
    geom: undefined,
    id: undefined,
    files: undefined,
    videos: undefined,
    photos: undefined,
    physic_photo: undefined,
    last_updated_member: undefined,
    last_updated_date: undefined,
    new_photos: undefined,
    new_video: undefined,
    new_files: undefined,
  }));
  const to_zone_values = Object.keys(to_zone).map(key => {
    return to_zone[key];
  });

  const sql = `
    INSERT INTO zone (${Object.keys(to_zone).map(key => {
        return key
      }).join(', ')}, last_updated_member, last_updated_date, geom )
    VALUES (${Object.keys(to_zone).map((key, idx) => {
        return '$' + (++idx)
      }).join(', ')}, '${req.query.who}', now()::timestamp, ST_GeomFromGeoJSON( '${req.body.geom.features ? JSON.stringify(req.body.geom.features[0].geometry) : JSON.stringify(req.body.geom.geometry)}' ) )
    RETURNING id
  `;
  const query_res = await db_query(sql, [...to_zone_values])
  .catch (err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });

  const dir = zonefilespath + query_res[0].id;
  // PHOTOS
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  await new Promise((resolve, reject) => {
    let img_names = [[],[],[]];
    let types = [[],[],[]];
    Object.keys(req.body.new_photos).forEach(lang => {
      if (req.body.new_photos[lang].length > 0) {
        req.body.new_photos[lang].forEach(photo => {
          const img = decodebase64img(photo);
          let path;
          switch(lang) {
            case 'ru':
              let img_name_ru = Math.random(10).toString(32).slice(2);
              img_names[0] = [...img_names[0], img_name_ru];
              types[0] = [...types[0], img.type.split('/')[1]];
              path = dir + '/' + img_name_ru + '_ru.' + img.type.split('/')[1];
            break;
            case 'kz':
              let img_name_kz = Math.random(10).toString(32).slice(2);
              img_names[1] = [...img_names[1], img_name_kz];
              types[1] = [...types[1], img.type.split('/')[1]];
              path = dir + '/' + img_name_kz + '_kz.' + img.type.split('/')[1];
            break;
            case 'en':
              let img_name_en = Math.random(10).toString(32).slice(2);
              img_names[2] = [...img_names[2], img_name_en];
              types[2] = [...types[2], img.type.split('/')[1]];
              path = dir + '/' + img_name_en + '_en.' + img.type.split('/')[1];
            break;
          }
          fs.writeFile(path, img.data, async err => {
            if (err) return reject(err);
            console.log('file was saved');
          });
        });
      }
    });
    return resolve({ img_names, types});
  }).then(async({ img_names, types }) => {
    console.log(img_names, types)

    const sql = `
      INSERT INTO zone_photos (name_ru, name_kz, name_en, zone_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/zones/' + req.body.id + '/';

    img_names.every(lang => {
      if (lang.length > 0) {
        lang.forEach(async (img_name, img_name_idx) => {
          await db_query(sql, [
            img_name, 
            img_name, 
            img_name, 
            req.body.id,
            img_names[0][img_name_idx] ? path + img_names[0][img_name_idx] + '_ru.' + types[0][img_name_idx] : '',
            img_names[1][img_name_idx] ? path + img_names[1][img_name_idx] + '_kz.' + types[1][img_name_idx] : '',
            img_names[2][img_name_idx] ? path + img_names[2][img_name_idx] + '_en.' + types[2][img_name_idx] : '',
          ]);
        });
        return false;
      }
      return true;
    });

  }).catch (err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });
  // END PHOTOS

  // VIDEO
  Object.keys(req.body.videos).forEach(async video => {
    const to_video = JSON.parse(JSON.stringify({
      ...req.body.videos[video],
      id: undefined,
    }));
    const to_video_values = Object.keys(to_video).map(key => {
      return to_video[key];
    });
    const sql = `
      UPDATE zone_videos SET
        ${Object.keys(to_video).map((key, idx) => {
          return key + ' = $' + (++idx)
        }).join(', ')}
      WHERE zone_videos.id = ${req.body.videos[video].id}
    `;
    await db_query(sql, [...to_video_values])
    .catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
  });

  const to_video = JSON.parse(JSON.stringify({
    ...req.body.new_video,
  }));
  const to_video_values = Object.keys(to_video).map(key => {
    return to_video[key];
  });
  const to_video_sql = `
    INSERT INTO zone_videos (name_ru, name_kz, name_en, src_ru, src_kz, src_en, zone_id ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  if (to_video_values[0] || to_video_values[1] || to_video_values[2]) {
    await db_query(to_video_sql, [...to_video_values, req.body.id])
    .catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
  }
  // END VIDEO

  // FILES
  await new Promise((resolve, reject) => {
    let file_names = [[],[],[]];
    let types = [[],[],[]];
    Object.keys(req.body.new_files).forEach(lang => {
      if (req.body.new_files[lang].length > 0) {
        req.body.new_files[lang].forEach(file => {
          const fl = decodebase64img(file);
          let path;
          switch(lang) {
            case 'ru':
              let file_name_ru = Math.random(10).toString(32).slice(2);
              file_names[0] = [...file_names[0], file_name_ru];
              types[0] = [...types[0], fl.type.split('/')[1]];
              path = dir + '/' + file_name_ru + '_ru.' + fl.type.split('/')[1];
            break;
            case 'kz':
              let file_name_kz = Math.random(10).toString(32).slice(2);
              file_names[1] = [...file_names[1], file_name_kz];
              types[1] = [...types[1], fl.type.split('/')[1]];
              path = dir + '/' + file_name_kz + '_kz.' + fl.type.split('/')[1];
            break;
            case 'en':
              let file_name_en = Math.random(10).toString(32).slice(2);
              file_names[2] = [...file_names[2], file_name_en];
              types[2] = [...types[2], fl.type.split('/')[1]];
              path = dir + '/' + file_name_en + '_en.' + fl.type.split('/')[1];
            break;
          }
          console.log(fl)
          fs.writeFile(path, fl.data, async err => {
            if (err) return reject(err);
            console.log('file was saved');
          });
        });
      }
    });
    return resolve({ file_names, types});
  }).then(async({ file_names, types }) => {
    console.log(file_names, types)

    const sql = `
      INSERT INTO zone_files (name_ru, name_kz, name_en, zone_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/zones/' + req.body.id + '/';

    file_names.every(lang => {
      if (lang.length > 0) {
        lang.forEach(async (file_name, file_name_idx) => {
          await db_query(sql, [
            file_name, 
            file_name, 
            file_name, 
            req.body.id,
            file_names[0][file_name_idx] ? path + file_names[0][file_name_idx] + '_ru.' + types[0][file_name_idx] : '',
            file_names[1][file_name_idx] ? path + file_names[1][file_name_idx] + '_kz.' + types[1][file_name_idx] : '',
            file_names[2][file_name_idx] ? path + file_names[2][file_name_idx] + '_en.' + types[2][file_name_idx] : '',
          ]);
        });
        return false;
      }
      return true;
    });

  }).catch (err => {
    console.err(err);
    res.status(500).json({
      msg: 'something broke',
    });
  });
  // END FILES

  res.json({ msg: 'zone added' });
});


router.put('/:id', body_parser.json({ limit: '100mb' }), async (req, res) => {
  const dir = zonefilespath + req.params.id;
  // PHOTOS
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  await new Promise((resolve, reject) => {
    let img_names = [[],[],[]];
    let types = [[],[],[]];
    Object.keys(req.body.new_photos).forEach(lang => {
      if (req.body.new_photos[lang].length > 0) {
        req.body.new_photos[lang].forEach(photo => {
          const img = decodebase64img(photo);
          let path;
          switch(lang) {
            case 'ru':
              let img_name_ru = Math.random(10).toString(32).slice(2);
              img_names[0] = [...img_names[0], img_name_ru];
              types[0] = [...types[0], img.type.split('/')[1]];
              path = dir + '/' + img_name_ru + '_ru.' + img.type.split('/')[1];
            break;
            case 'kz':
              let img_name_kz = Math.random(10).toString(32).slice(2);
              img_names[1] = [...img_names[1], img_name_kz];
              types[1] = [...types[1], img.type.split('/')[1]];
              path = dir + '/' + img_name_kz + '_kz.' + img.type.split('/')[1];
            break;
            case 'en':
              let img_name_en = Math.random(10).toString(32).slice(2);
              img_names[2] = [...img_names[2], img_name_en];
              types[2] = [...types[2], img.type.split('/')[1]];
              path = dir + '/' + img_name_en + '_en.' + img.type.split('/')[1];
            break;
          }
          fs.writeFile(path, img.data, async err => {
            if (err) return reject(err);
            console.log('file was saved');
          });
        });
      }
    });
    return resolve({ img_names, types});
  }).then(async({ img_names, types }) => {
    console.log(img_names, types)

    const sql = `
      INSERT INTO zone_photos (name_ru, name_kz, name_en, zone_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/zones/' + req.body.id + '/';

    img_names.every(lang => {
      if (lang.length > 0) {
        lang.forEach(async (img_name, img_name_idx) => {
          await db_query(sql, [
            img_name, 
            img_name, 
            img_name, 
            req.body.id,
            img_names[0][img_name_idx] ? path + img_names[0][img_name_idx] + '_ru.' + types[0][img_name_idx] : '',
            img_names[1][img_name_idx] ? path + img_names[1][img_name_idx] + '_kz.' + types[1][img_name_idx] : '',
            img_names[2][img_name_idx] ? path + img_names[2][img_name_idx] + '_en.' + types[2][img_name_idx] : '',
          ]);
        });
        return false;
      }
      return true;
    });

  });
  // END PHOTOS

  // VIDEO
  Object.keys(req.body.videos).forEach(async video => {
    const to_video = JSON.parse(JSON.stringify({
      ...req.body.videos[video],
      id: undefined,
    }));
    const to_video_values = Object.keys(to_video).map(key => {
      return to_video[key];
    });
    const sql = `
      UPDATE zone_videos SET
        ${Object.keys(to_video).map((key, idx) => {
          return key + ' = $' + (++idx)
        }).join(', ')}
      WHERE zone_videos.id = ${req.body.videos[video].id}
    `;
    await db_query(sql, [...to_video_values])
    .catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
  });

  const to_video = JSON.parse(JSON.stringify({
    ...req.body.new_video,
  }));
  const to_video_values = Object.keys(to_video).map(key => {
    return to_video[key];
  });
  const to_video_sql = `
    INSERT INTO zone_videos (name_ru, name_kz, name_en, src_ru, src_kz, src_en, zone_id ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  if (to_video_values[0] || to_video_values[1] || to_video_values[2]) {
    await db_query(to_video_sql, [...to_video_values, req.body.id])
    .catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
  }
  // END VIDEO

  // FILES
  await new Promise((resolve, reject) => {
    let file_names = [[],[],[]];
    let types = [[],[],[]];
    Object.keys(req.body.new_files).forEach(lang => {
      if (req.body.new_files[lang].length > 0) {
        req.body.new_files[lang].forEach(file => {
          const fl = decodebase64img(file);
          let path;
          switch(lang) {
            case 'ru':
              let file_name_ru = Math.random(10).toString(32).slice(2);
              file_names[0] = [...file_names[0], file_name_ru];
              types[0] = [...types[0], fl.type.split('/')[1]];
              path = dir + '/' + file_name_ru + '_ru.' + fl.type.split('/')[1];
            break;
            case 'kz':
              let file_name_kz = Math.random(10).toString(32).slice(2);
              file_names[1] = [...file_names[1], file_name_kz];
              types[1] = [...types[1], fl.type.split('/')[1]];
              path = dir + '/' + file_name_kz + '_kz.' + fl.type.split('/')[1];
            break;
            case 'en':
              let file_name_en = Math.random(10).toString(32).slice(2);
              file_names[2] = [...file_names[2], file_name_en];
              types[2] = [...types[2], fl.type.split('/')[1]];
              path = dir + '/' + file_name_en + '_en.' + fl.type.split('/')[1];
            break;
          }
          console.log(fl)
          fs.writeFile(path, fl.data, async err => {
            if (err) return reject(err);
            console.log('file was saved');
          });
        });
      }
    });
    return resolve({ file_names, types});
  }).then(async({ file_names, types }) => {
    console.log(file_names, types)

    const sql = `
      INSERT INTO zone_files (name_ru, name_kz, name_en, zone_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/zones/' + req.body.id + '/';

    file_names.every(lang => {
      if (lang.length > 0) {
        lang.forEach(async (file_name, file_name_idx) => {
          await db_query(sql, [
            file_name, 
            file_name, 
            file_name, 
            req.body.id,
            file_names[0][file_name_idx] ? path + file_names[0][file_name_idx] + '_ru.' + types[0][file_name_idx] : '',
            file_names[1][file_name_idx] ? path + file_names[1][file_name_idx] + '_kz.' + types[1][file_name_idx] : '',
            file_names[2][file_name_idx] ? path + file_names[2][file_name_idx] + '_en.' + types[2][file_name_idx] : '',
          ]);
        });
        return false;
      }
      return true;
    });

  });
  // END FILES

  const sql_geom = `
    UPDATE zone SET geom = ST_GeomFromGeoJSON( $1 )
    WHERE zone.id = ${req.body.id}
  `;
  await db_query(sql_geom, req.body.geom.features ? [req.body.geom.features[0].geometry] : [req.body.geom.geometry]);

  const to_zone = JSON.parse(JSON.stringify({
    ...req.body,
    geom: undefined,
    id: undefined,
    files: undefined,
    videos: undefined,
    photos: undefined,
    physic_photo: undefined,
    last_updated_member: undefined,
    last_updated_date: undefined,
    new_photos: undefined,
    new_video: undefined,
    new_files: undefined,
  }));
  const to_zone_values = Object.keys(to_zone).map(key => {
    return to_zone[key];
  });
  const sql = `
    UPDATE zone SET
      ${Object.keys(to_zone).map((key, idx) => {
        return key + ' = $' + (++idx)
      }).join(', ')}
      , last_updated_member = '${req.query.who}'
      , last_updated_date = now()::timestamp
    WHERE zone.id = ${req.body.id}
  `;
  console.log(sql)
  return await db_query(sql, [...to_zone_values])
    .then(_ => res.json({
      msg: 'zone updated',
    })).catch (err => {
      console.err(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
});

module.exports = router;
