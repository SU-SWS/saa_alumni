import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthenticatedPage = ({ children, redirectUnauthorized = true }) => {
  const { isAuthenticated } = useAuth(redirectUnauthorized);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <div>Redirecting to login page...</div>;
};

export default AuthenticatedPage;
