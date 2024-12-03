import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../store';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = useSelector(selectIsAuth);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
