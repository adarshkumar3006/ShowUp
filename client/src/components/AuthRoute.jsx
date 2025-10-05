import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AuthRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthRoute;
