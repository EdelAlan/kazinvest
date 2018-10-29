const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');
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
    'SELECT * FROM zone_photos',
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


router.put('/:id', body_parser.json(), async (req, res) => {
  const to_zone = JSON.parse(JSON.stringify({
    ...req.body,
    id: undefined,
    files: undefined,
    videos: undefined,
    photos: undefined,
  }));
  console.log(to_zone)
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
  console.log(sql)
  // return;
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
