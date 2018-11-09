const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');
const decodebase64img = require('../util/decodebase64img');
const fs = require('fs');
const zonefilespath = __dirname + '/../../../front/public/files/zones/';

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
  zone.contacts_kz,
  zone.contacts_en,
  created_date,
  budget_need,
  budget_allocated,
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
    `SELECT * FROM zone_photos WHERE src_${lang} IS NOT NULL`,
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
  res.send(await db_query(`
      SELECT ${FIELDS} 
      FROM zone 
      left join provinces
      ON zone.province_id = provinces.id
      WHERE id = $1
    `,
    [req.params.id],
  ));
});





router.put('/:id', body_parser.json({ limit: '100mb' }), async (req, res) => {
  // FILES
  const dir = zonefilespath + req.params.id;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (req.body.physic_photo.ru != null && req.body.physic_photo.kz != null && req.body.physic_photo.en != null) {
    await new Promise((resolve, reject) => {
      const img_name = Math.random(10).toString(32).slice(2);
      let types = [];
      Object.keys(req.body.physic_photo).filter(it => it != null).forEach(lang => {
        const img = decodebase64img(req.body.physic_photo[lang]);
        types = [...types, img.type.split('/')[1]];
        const path = dir + '/' + img_name + '_' + lang + '.' + img.type.split('/')[1];
        fs.writeFile(path, img.data, async err => {
          if (err) return reject(err);
          console.log('file was saved');
        });
      });
      return resolve({ img_name, types});
    }).then(async({ img_name, types }) => {
      console.log(img_name, types)
      const sql = `
        INSERT INTO zone_photos (name_ru, name_kz, name_en, zone_id, src_ru, src_kz, src_en ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const path = '/files/zones/' + req.params.id + '/';
      await db_query(sql, [
        img_name + '_ru', 
        img_name + '_kz', 
        img_name + '_en', 
        req.params.id,
        path + img_name + '_ru.' + types[0],
        path + img_name + '_kz.' + types[1],
        path + img_name + '_en.' + types[2],
      ]);
    });
  }
  // END FILES






  req.body.infrastructures.forEach(infrastructure => {
    const to_infrastructures = JSON.parse(JSON.stringify({
      ...infrastructure,
      created_date: undefined,
      id: undefined,
      title_ru: undefined,
      title_en: undefined,
      title_kz: undefined,
      zone_id: undefined,
      status: undefined,
      type: undefined,
      st_asgeojson: undefined,
    }));
    const to_infrastructures_values = Object.keys(to_infrastructures).map(key => {
      return to_infrastructures[key];
    });
  });
  // const to_infrastructures = JSON.parse(JSON.stringify({
  //   ...req.body.infrastructures,
  //   created_date: undefined,
  //   id: undefined,
  //   title_ru: undefined,
  //   title_en: undefined,
  //   title_kz: undefined,
  //   zone_id: undefined,
  //   status: undefined,
  //   type: undefined,
  //   st_asgeojson: undefined,
  // }));
  // const to_infrastructures_values = Object.keys(to_infrastructures).map(key => {
  //   return to_infrastructures[key];
  // });
  // console.log(to_infrastructures);
  // console.log(to_infrastructures_values);
  // const sql = `
  //   UPDATE infrastructures SET
  //     ${Object.keys(to_zone).map((key, idx) => {
  //       return key + ' = $' + (++idx)
  //     }).join(', ')}
  //   WHERE zone.id = ${req.body.id}
  // `;


  const to_zone = JSON.parse(JSON.stringify({
    ...req.body,
    id: undefined,
    files: undefined,
    videos: undefined,
    photos: undefined,
    physic_photo: undefined,
    infrastructures: undefined,
    objects: undefined,
  }));
  // console.log(photos)
  // return;
  const to_zone_values = Object.keys(to_zone).map(key => {
    return to_zone[key];
  });
  const sql = `
    UPDATE zone SET
      ${Object.keys(to_zone).map((key, idx) => {
        return key + ' = $' + (++idx)
      }).join(', ')}
    WHERE zone.id = ${req.body.id}
  `;
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
