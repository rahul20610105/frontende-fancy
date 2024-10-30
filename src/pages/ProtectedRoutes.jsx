// src/pages/ProtectedRoutes.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token is found, redirect to login
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        
        // Check if user is admin
        if (decodedToken.isAdmin) {
            return <Outlet />; // Render the child route if the user is an admin
        } else {
            return <Navigate to="/" replace />; // Redirect if not an admin
        }
    } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
