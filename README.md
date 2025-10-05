# ShowUP Movie Booking Application

This is a full-stack movie booking application built with the MERN stack (React, Node.js, Express, and PostgreSQL).

## Features

- User authentication (signup and login).
- Browse a list of movies.
- View movie details.
- View showtimes for a specific movie and date.
- Select seats from a seat map.
- Book seats.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router.
- **Backend:** Node.js, Express, PostgreSQL, JWT for authentication.

## Database Schema

- **users**: `id`, `name`, `email`, `password`
- **cinemas**: `id`, `name`, `location`
- **screens**: `id`, `cinema_id`, `name`
- **movies**: `id`, `title`, `description`, `duration`
- **shows**: `id`, `movie_id`, `screen_id`, `start_time`
- **bookings**: `id`, `user_id`, `show_id`, `seats` (JSON), `status`

## How to Run

### Prerequisites

- Node.js
- PostgreSQL

### Backend

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory with the following content:
    ```
    DB_HOST=localhost
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_NAME=movie_booking
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    ```
4.  Create the PostgreSQL database:
    ```sql
    CREATE DATABASE movie_booking;
    ```
5.  Set up the database tables:
    ```bash
    npm run db:setup
    ```
6.  Seed the database with sample data:
    ```bash
    npm run db:seed
    ```
7.  Start the backend server:
    ```bash
    node index.js
    ```

### Frontend

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
