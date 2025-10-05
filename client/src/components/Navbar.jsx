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
        <Link to="/" className="text-2xl font-bold">
          ShowUP
        </Link>
        <div>
          {user && user.id ? (
            <>
              <span className="mr-4">Welcome, {user.name || user.email}!</span>
              {user.is_admin && (
                <Link to="/admin" className="mr-4">
                  Admin
                </Link>
              )}
              <Link to="/my-bookings" className="mr-4">
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
