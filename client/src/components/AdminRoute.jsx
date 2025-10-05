
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (!user.is_admin) {
    // User is authenticated but not an admin, redirect to home or show forbidden message
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
