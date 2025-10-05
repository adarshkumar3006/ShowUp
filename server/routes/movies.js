const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM movies';
    let params = [];

    if (search) {
      query += ' WHERE title ILIKE $1';
      params.push(`%${search}%`);
    }

    const movies = await pool.query(query, params);
    res.json(movies.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    res.json(movie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;