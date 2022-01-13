import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthenticatedPage = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <div>Redirecting to login page...</div>;
};

export default AuthenticatedPage;
