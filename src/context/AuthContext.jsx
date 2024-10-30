import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // New state for role

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
      // Decode token to get user role
      try {
        const decoded = jwtDecode(token); // Decode the token
        setUserRole(decoded.isAdmin ? 'admin' : 'public');
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Optionally handle invalid token here
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);

    // Decode token to get user role
    try {
      const decoded = jwtDecode(token); // Decode the token
      setUserRole(decoded.isAdmin ? 'admin' : 'public');
    } catch (error) {
      console.error("Failed to decode token:", error);
      // Optionally handle invalid token here
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
