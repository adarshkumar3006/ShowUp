import React from "react";
import MovieList from "./MovieList";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-96 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Show Up</h1>
          <p className="text-xl">Skip the Queue, Catch the Show!</p>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
