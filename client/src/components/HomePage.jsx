import React from "react";
import Footer from "./Footer";
import MovieList from "./MovieList";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-96 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Movie Booking</h1>
          <p className="text-xl">Book your favorite movies with ease</p>
        </div>
      </div>

      {/* Movie List Section */}
      <div className="container mx-auto py-8">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
