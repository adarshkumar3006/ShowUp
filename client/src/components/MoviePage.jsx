import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/shows?movie_id=${id}&date=${selectedDate}`
        );
        setShows(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (id && selectedDate) {
      fetchShows();
    }
  }, [id, selectedDate]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-gray-600">{movie.description}</p>
      <p className="text-gray-800 font-bold">
        Duration: {movie.duration} minutes
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shows.map((show) => (
            <Link to={`/shows/${show.id}/seats`} key={show.id}>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-bold">{show.cinema_name}</h3>
                <p className="text-gray-600">{show.screen_name}</p>
                <p className="text-gray-800 font-bold">
                  {new Date(show.start_time).toLocaleTimeString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
