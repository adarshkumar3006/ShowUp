const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../db');

router.post('/', auth, async (req, res) => {
  try {
    const { show_id, seats } = req.body;
    const user_id = req.user.id;


    const existingBookings = await pool.query(
      'SELECT seats FROM bookings WHERE show_id = $1 AND status = $2',
      [show_id, 'confirmed']
    );

    const bookedSeatsForShow = existingBookings.rows.reduce((acc, row) => acc.concat(row.seats), []);

    const alreadyBooked = seats.some(seat => bookedSeatsForShow.includes(seat));

    if (alreadyBooked) {
      return res.status(400).json({ message: 'Some of the selected seats are already booked.' });
    }

    const newBooking = await pool.query(
      'INSERT INTO bookings (user_id, show_id, seats, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, show_id, JSON.stringify(seats), 'confirmed']
    );

    res.status(201).json(newBooking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:show_id/seats', async (req, res) => {
  try {
    const { show_id } = req.params;
    const bookedSeats = await pool.query(
      'SELECT seats FROM bookings WHERE show_id = $1 AND status = $2',
      [show_id, 'confirmed']
    );
    const seats = bookedSeats.rows.reduce((acc, row) => acc.concat(row.seats), []);
    res.json(seats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const userBookings = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1',
      [user_id]
    );
    res.json(userBookings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);

    if (booking.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }


    if (booking.rows[0].user_id !== user_id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    const cancelledBooking = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * ',
      ['cancelled', id]
    );

    res.json(cancelledBooking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
