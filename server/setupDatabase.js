const pool = require('./db');

const setupDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log('Connected to the database.');

    // Drop tables if they exist (in reverse order of dependency)
    await client.query('DROP TABLE IF EXISTS bookings;');
    await client.query('DROP TABLE IF EXISTS shows;');
    await client.query('DROP TABLE IF EXISTS screens;');
    await client.query('DROP TABLE IF EXISTS cinemas;');
    await client.query('DROP TABLE IF EXISTS movies;');
    await client.query('DROP TABLE IF EXISTS users;');

    const createUsersTable = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
      );
    `;

    const createCinemasTable = `
      CREATE TABLE cinemas (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL
      );
    `;

    const createScreensTable = `
      CREATE TABLE screens (
        id SERIAL PRIMARY KEY,
        cinema_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
      );
    `;

    const createMoviesTable = `
      CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration INT NOT NULL
      );
    `;

    const createShowsTable = `
      CREATE TABLE shows (
        id SERIAL PRIMARY KEY,
        movie_id INT NOT NULL,
        screen_id INT NOT NULL,
        start_time TIMESTAMP NOT NULL,
        FOREIGN KEY (movie_id) REFERENCES movies(id),
        FOREIGN KEY (screen_id) REFERENCES screens(id)
      );
    `;

    const createBookingsTable = `
      CREATE TABLE bookings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        show_id INT NOT NULL,
        seats JSON NOT NULL,
        status VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (show_id) REFERENCES shows(id)
      );
    `;

    await client.query(createUsersTable);
    await client.query(createCinemasTable);
    await client.query(createScreensTable);
    await client.query(createMoviesTable);
    await client.query(createShowsTable);
    await client.query(createBookingsTable);

    console.log('Tables created successfully.');

  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    client.release();
    pool.end();
  }
};

setupDatabase();