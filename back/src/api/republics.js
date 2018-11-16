const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');
const repfilespath = __dirname + '/../../../front/public/files/republics/';
const decodebase64img = require('../util/decodebase64img');
const fs = require('fs');

router.get('/', async (_, res) => {
  let republics = await db_query(
    'SELECT * FROM republics ORDER BY id',
  );
  const republics_videos = await db_query(
    'SELECT * FROM republic_videos',
  );
  const republics_files = await db_query(
    'SELECT * FROM republic_files',
  );
  const republics_photos = await db_query(
    'SELECT * FROM republic_photos',
  );

  republics = republics.map(republic => {
    return {
      ...republic,
      videos: republics_videos
        .filter(vid => vid.republic_id == republic.id),
      files: republics_files
        .filter(file => file.republic_id == republic.id),
      photos: republics_photos
        .filter(photo => photo.republic_id == republic.id),
    };
  });

  res.send(republics);
});

router.put('/', body_parser.json({ limit: '100mb' }), async (req, res) => {
  const dir = repfilespath + req.body.id;
  // PHOTOS
  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir);
  // }
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
      INSERT INTO republic_photos (name_ru, name_kz, name_en, republic_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/republics/' + req.body.id + '/';

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
            img_names[2][img_name_idx] ? path + img_names[2][img_name_idx] + '._en' + types[2][img_name_idx] : '',
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
      UPDATE republic_videos SET
        ${Object.keys(to_video).map((key, idx) => {
          return key + ' = $' + (++idx)
        }).join(', ')}
      WHERE republic_videos.id = ${req.body.videos[video].id}
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
    INSERT INTO republic_videos (name_ru, name_kz, name_en, republic_id, src_ru, src_kz, src_en ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  if (to_video_values.src_ru || to_video_values.src_kz || to_video_values.src_en) {
    await db_query(to_video_sql, [...to_video_values])
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
      INSERT INTO republic_files (name_ru, name_kz, name_en, republic_id, src_ru, src_kz, src_en ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const path = '/files/republics/' + req.body.id + '/';

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
            file_names[2][file_name_idx] ? path + file_names[2][file_name_idx] + '._en' + types[2][file_name_idx] : '',
          ]);
        });
        return false;
      }
      return true;
    });

  });
  // END FILES


  const to_republic = JSON.parse(JSON.stringify({
    ...req.body,
    videos: undefined,
    photos: undefined,
    files: undefined,

    new_video: undefined,
    new_photos: undefined,
    new_files: undefined,
  }));
  const to_republic_values = Object.keys(to_republic).map(key => {
    return to_republic[key];
  });
  const sql = `
    UPDATE republics SET
      ${Object.keys(to_republic).map((key, idx) => {
        return key + ' = $' + (++idx)
      }).join(', ')}
    WHERE republics.id = ${req.body.id}
  `;
  return await db_query(sql, [...to_republic_values])
    .then(_ => res.json({
      msg: 'republic updated',
    })).catch (err => {
      console.log(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
});

router.put('/contacts', body_parser.json(), async (req, res) => {
  const to_contacts = JSON.parse(JSON.stringify({
    ...req.body,
  }));
  const to_contacts_values = Object.keys(to_contacts).map(key => {
    return to_contacts[key];
  });
  const sql = `
    UPDATE republics 
    SET contacts_ru = $1, contacts_kz = $2, contacts_en = $3
    WHERE republics.id = 1
  `;
  return await db_query(sql, [...to_contacts_values])
    .then(_ => res.json({
      msg: 'contacts updated',
    })).catch (err => {
      console.err(err);
      res.status(500).json({
        msg: 'something broke',
      });
    });
});

module.exports = router;
