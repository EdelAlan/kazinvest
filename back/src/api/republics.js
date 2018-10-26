const router = require('express-async-router').AsyncRouter();
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

module.exports = router;
