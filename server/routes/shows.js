const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { movie_id, date } = req.query;
    const shows = await pool.query(
      'SELECT s.id, s.start_time, c.name as cinema_name, sc.name as screen_name FROM shows s JOIN screens sc ON s.screen_id = sc.id JOIN cinemas c ON sc.cinema_id = c.id WHERE s.movie_id = $1 AND s.start_time::date = $2',
      [movie_id, date]
    );
    res.json(shows.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;