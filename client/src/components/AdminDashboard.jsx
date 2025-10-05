
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/movies" className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          <h2 className="text-xl font-bold">Manage Movies</h2>
          <p>Add, edit, or delete movies</p>
        </Link>
        <Link to="/admin/cinemas" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          <h2 className="text-xl font-bold">Manage Cinemas</h2>
          <p>Add, edit, or delete cinemas</p>
        </Link>
        <Link to="/admin/screens" className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
          <h2 className="text-xl font-bold">Manage Screens</h2>
          <p>Add, edit, or delete screens</p>
        </Link>
        <Link to="/admin/shows" className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
          <h2 className="text-xl font-bold">Manage Shows</h2>
          <p>Add, edit, or delete shows</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
