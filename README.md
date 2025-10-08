# ShowUP Movie Booking Application

ShowUP is a full-stack movie ticket booking platform built using the MERN stack (React, Node.js, Express, and PostgreSQL).
It allows users to browse movies, view show details, select seats, and book tickets, while providing an admin dashboard for managing movies and shows efficiently.

## Features

- **User Authentication** – Secure signup and login using JWT.

- **Browse Movies** – Explore movie listings with details like title, description, and duration.

- **View Showtimes** – View all available showtimes for selected movies and dates.

- **Interactive Seat Selection** – Choose seats from a dynamic seat map with live status updates.

- **Book Seats** – Book one or more seats for a movie show.

- **My Bookings Page** – View and manage your active and cancelled bookings.

- **Admin Dashboard** – Admin can:

Add, update, or remove movies and show details.

Manage cinemas and screens.

Monitor bookings and availability.

- **Responsive UI** – Built with Tailwind CSS for a modern, consistent design.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router.
- **Backend:** Node.js, Express, PostgreSQL.
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Management:** dotenv

## Database Schema

- **users**: `id`, `name`, `email`, `password`
- **cinemas**: `id`, `name`, `location`
- **screens**: `id`, `cinema_id`, `name`
- **movies**: `id`, `title`, `description`, `duration`, `poster_url`
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
6.  Start the backend server:
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

### Future Enhancements

**Real-Time Seat Blocking** – Integrate Socket.io for real-time concurrency to prevent double booking.

**Online Payments** – Integrate payment gateways (e.g., Razorpay or Stripe) for seamless checkout.

**Mobile-Friendly Design** – Enhance UI/UX for mobile responsiveness.

**Analytics Dashboard** – Add insights for admins to view booking trends and revenue.

**Cloud Deployment** – Deploy backend on Render/AWS and frontend on Vercel/Netlify.
