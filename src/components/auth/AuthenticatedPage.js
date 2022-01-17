import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthenticatedPage = ({ children }) => {
  const redirectToLogin = true;
  const { isAuthenticated } = useAuth(redirectToLogin);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <div>Redirecting to login page...</div>;
};

export default AuthenticatedPage;
