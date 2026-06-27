import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Wrapper Component
 * Restricts access to authenticated users only.
 * If token exists in localStorage, renders child route (<Outlet />); otherwise redirects to /login.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If token is missing, redirect user to login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
