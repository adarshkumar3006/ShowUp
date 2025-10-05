import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/movies");
        setMovies(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                  {movie.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {movie.description}
                </p>
                <p className="text-gray-800 font-semibold text-sm">
                  Duration: {movie.duration} min
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
