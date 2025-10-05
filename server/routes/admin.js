const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const pool = require('../db');

router.get('/movies', auth, admin, async (req, res) => {
  try {
    const allMovies = await pool.query('SELECT * FROM movies');
    res.json(allMovies.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/movies', auth, admin, async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const newMovie = await pool.query(
      'INSERT INTO movies (title, description, duration) VALUES ($1, $2, $3) RETURNING * ',
      [title, description, duration]
    );
    res.status(201).json(newMovie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/movies/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    const updatedMovie = await pool.query(
      'UPDATE movies SET title = $1, description = $2, duration = $3 WHERE id = $4 RETURNING * ',
      [title, description, duration, id]
    );
    if (updatedMovie.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/movies/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await pool.query(
      'DELETE FROM movies WHERE id = $1 RETURNING * ',
      [id]
    );
    if (deletedMovie.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/cinemas', auth, admin, async (req, res) => {
  try {
    const allCinemas = await pool.query('SELECT * FROM cinemas');
    res.json(allCinemas.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/cinemas', auth, admin, async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCinema = await pool.query(
      'INSERT INTO cinemas (name, location) VALUES ($1, $2) RETURNING * ',
      [name, location]
    );
    res.status(201).json(newCinema.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/cinemas/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const updatedCinema = await pool.query(
      'UPDATE cinemas SET name = $1, location = $2 WHERE id = $3 RETURNING * ',
      [name, location, id]
    );
    if (updatedCinema.rows.length === 0) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    res.json(updatedCinema.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/cinemas/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCinema = await pool.query(
      'DELETE FROM cinemas WHERE id = $1 RETURNING * ',
      [id]
    );
    if (deletedCinema.rows.length === 0) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    res.json({ message: 'Cinema deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/screens', auth, admin, async (req, res) => {
  try {
    const allScreens = await pool.query('SELECT * FROM screens');
    res.json(allScreens.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/screens', auth, admin, async (req, res) => {
  try {
    const { cinema_id, name } = req.body;
    const newScreen = await pool.query(
      'INSERT INTO screens (cinema_id, name) VALUES ($1, $2) RETURNING * ',
      [cinema_id, name]
    );
    res.status(201).json(newScreen.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/screens/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { cinema_id, name } = req.body;
    const updatedScreen = await pool.query(
      'UPDATE screens SET cinema_id = $1, name = $2 WHERE id = $3 RETURNING * ',
      [cinema_id, name, id]
    );
    if (updatedScreen.rows.length === 0) {
      return res.status(404).json({ message: 'Screen not found' });
    }
    res.json(updatedScreen.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/screens/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScreen = await pool.query(
      'DELETE FROM screens WHERE id = $1 RETURNING * ',
      [id]
    );
    if (deletedScreen.rows.length === 0) {
      return res.status(404).json({ message: 'Screen not found' });
    }
    res.json({ message: 'Screen deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/shows', auth, admin, async (req, res) => {
  try {
    const allShows = await pool.query('SELECT * FROM shows');
    res.json(allShows.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/shows', auth, admin, async (req, res) => {
  try {
    const { movie_id, screen_id, start_time } = req.body;
    const newShow = await pool.query(
      'INSERT INTO shows (movie_id, screen_id, start_time) VALUES ($1, $2, $3) RETURNING * ',
      [movie_id, screen_id, start_time]
    );
    res.status(201).json(newShow.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/shows/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_id, screen_id, start_time } = req.body;
    const updatedShow = await pool.query(
      'UPDATE shows SET movie_id = $1, screen_id = $2, start_time = $3 WHERE id = $4 RETURNING * ',
      [movie_id, screen_id, start_time, id]
    );
    if (updatedShow.rows.length === 0) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json(updatedShow.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/shows/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShow = await pool.query(
      'DELETE FROM shows WHERE id = $1 RETURNING * ',
      [id]
    );
    if (deletedShow.rows.length === 0) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json({ message: 'Show deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;