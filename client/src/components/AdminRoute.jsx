import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.is_admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
