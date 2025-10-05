import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import MoviePage from './components/MoviePage';
import SeatSelection from './components/SeatSelection';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ManageMovies from './components/admin/ManageMovies';
import ManageCinemas from './components/admin/ManageCinemas';
import ManageScreens from './components/admin/ManageScreens';
import ManageShows from './components/admin/ManageShows';
import UserBookings from './components/UserBookings';
import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/shows/:id/seats" element={<SeatSelection />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/movies" element={<AdminRoute><ManageMovies /></AdminRoute>} />
          <Route path="/admin/cinemas" element={<AdminRoute><ManageCinemas /></AdminRoute>} />
          <Route path="/admin/screens" element={<AdminRoute><ManageScreens /></AdminRoute>} />
          <Route path="/admin/shows" element={<AdminRoute><ManageShows /></AdminRoute>} />
          <Route path="/my-bookings" element={<AuthRoute><UserBookings /></AuthRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;