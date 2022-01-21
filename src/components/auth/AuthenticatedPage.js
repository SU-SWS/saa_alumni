import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthenticatedPage = ({ children, redirectUnauthorized = true }) => {
  const { isAuthenticated } = useAuth(redirectUnauthorized);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <div>Checking authentication status...</div>;
};

export default AuthenticatedPage;
