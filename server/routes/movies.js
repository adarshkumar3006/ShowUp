
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const allMovies = await pool.query('SELECT * FROM movies');
    res.json(allMovies.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single movie
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
