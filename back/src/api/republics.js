const router = require('express-async-router').AsyncRouter();
const db_query = require('../util/db_query');

router.get('/', async (req, res) => {
  let republics = await db_query(
    'SELECT * FROM republics ORDER BY id',
  );
  const republics_videos = await db_query(
    'SELECT * FROM republic_videos',
  );
  const republics_files = await db_query(
    'SELECT * FROM republic_files',
  );

  republics = republics.map(republic => {
    return {
      ...republic,
      videos: republics_videos
        .filter(vid => vid.republic_id == republic.id),
      files: republics_files
        .filter(vid => vid.republic_id == republic.id),
    };
  });

  res.send(republics);
});

module.exports = router;
