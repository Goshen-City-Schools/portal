// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const PrivateRoute = ({ element, ...rest }) => {
  // Use useSelector to access the user's authentication status
  const userData = localStorage.getItem('user');

  return userData ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default PrivateRoute;
