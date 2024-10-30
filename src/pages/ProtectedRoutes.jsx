// ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Get the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is authenticated and has the isAdmin role
  if (!user || !user.isAdmin) {
    // If not, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated and isAdmin, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;