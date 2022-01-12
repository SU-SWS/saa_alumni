import React from 'react';
import { useAuth } from '../../hooks/useAuth';
const AuthenticatedPage = ({ children }) => {
  const { isAuthenticated, isAuthenticating, user } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isAuthenticating) {
    return (
      <>
        <h1>Access Denied</h1>
      </>
    );
  }

  return <div>Checking authenticating status...</div>;
};

export default AuthenticatedPage;
