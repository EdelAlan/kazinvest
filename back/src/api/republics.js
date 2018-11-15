const router = require('express-async-router').AsyncRouter();
const body_parser = require('body-parser');
const db_query = require('../util/db_query');

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
  // PHOTOS

  const to_republic = JSON.parse(JSON.stringify({
    ...req.body,
    videos: undefined,
    photos: undefined,
    files: undefined,
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
      console.err(err);
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
