
// const pool = require('./db');
// const bcrypt = require('bcryptjs');

// const seedDatabase = async () => {
//   try {
//     // Seed users
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash('password', salt);
//     await pool.query(
//       'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4)',
//       ['Test User', 'admin@gmail.com', hashedPassword, true]
//     );
//     console.log('Users seeded successfully.');

//     // Seed movies
//     const movies = [
//       {
//         title: 'Inception',
//         description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
//         duration: 148,
//       },
//       {
//         title: 'The Dark Knight',
//         description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
//         duration: 152,
//       },
//       {
//         title: 'Interstellar',
//         description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
//         duration: 169,
//       },
//     ];

//     const movieIds = [];
//     for (const movie of movies) {
//       const res = await pool.query(
//         'INSERT INTO movies (title, description, duration) VALUES ($1, $2, $3) RETURNING id',
//         [movie.title, movie.description, movie.duration]
//       );
//       movieIds.push(res.rows[0].id);
//     }
//     console.log('Movies seeded successfully.');

//     // Seed cinemas
//     const cinemas = [
//       { name: 'Cinema City', location: 'Downtown' },
//       { name: 'MegaPlex', location: 'Uptown' },
//     ];

//     const cinemaIds = [];
//     for (const cinema of cinemas) {
//       const res = await pool.query(
//         'INSERT INTO cinemas (name, location) VALUES ($1, $2) RETURNING id',
//         [cinema.name, cinema.location]
//       );
//       cinemaIds.push(res.rows[0].id);
//     }
//     console.log('Cinemas seeded successfully.');

//     // Seed screens
//     const screenIds = [];
//     for (const cinemaId of cinemaIds) {
//       for (let i = 1; i <= 3; i++) {
//         const res = await pool.query(
//           'INSERT INTO screens (cinema_id, name) VALUES ($1, $2) RETURNING id',
//           [cinemaId, `Screen ${i}`]
//         );
//         screenIds.push(res.rows[0].id);
//       }
//     }
//     console.log('Screens seeded successfully.');

//     // Seed shows
//     for (const movieId of movieIds) {
//       for (const screenId of screenIds) {
//         for (let i = 0; i < 3; i++) {
//           const startTime = new Date();
//           startTime.setDate(startTime.getDate() + i);
//           startTime.setHours(18 + i, 0, 0, 0); // Shows at 6 PM, 7 PM, 8 PM

//           await pool.query(
//             'INSERT INTO shows (movie_id, screen_id, start_time) VALUES ($1, $2, $3)',
//             [movieId, screenId, startTime]
//           );
//         }
//       }
//     }
//     console.log('Shows seeded successfully.');

//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     pool.end();
//   }
// };

// seedDatabase();
