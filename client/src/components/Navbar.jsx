import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-red-400 transition duration-200"
        >
          ShowUP
        </Link>

        {/* Navigation links */}
        <div className="flex items-center">
          {user && user.id ? (
            <>
              <span className="mr-4 hover:text-blue-400 transition duration-200 cursor-pointer">
                Welcome, {user.name || user.email}!
              </span>

              {user.is_admin && (
                <Link
                  to="/admin"
                  className="mr-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                  type="button"
                >
                  Admin
                </Link>
              )}

              <Link
                to="/my-bookings"
                className="mr-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                type="button"
              >
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded font-bold transition duration-200"
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                type="button"
                className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
