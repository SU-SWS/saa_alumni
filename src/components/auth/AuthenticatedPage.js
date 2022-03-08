import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import AuthContext from '../../contexts/AuthContext';

const AuthenticatedPage = ({ children, redirectUnauthorized = true }) => {
  function redirectUnuauthorized() {
    const returnUrl = window.location.pathname;
    const query = new URLSearchParams({ final_destination: returnUrl });
    window.location = `/api/auth/login?${query.toString()}`;
  }

  function accessDenied() {
    window.location = `/403-access-denied`;
  }

  return (
    <AuthContext.Consumer>
      {(authState) => {
        // Still waiting for authentication state to be checked.
        if (authState.isAuthenticating) {
          return (
            <div className="su-flex su-justify-center su-py-16">
              <PulseLoader color="#820000" size={16} />
            </div>
          );
        }
        // User is logged in. Render page.
        if (authState.isAuthenticated && !authState.isAuthenticating) {
          return <>{children}</>;
        }
        // User is logged out, redirect to login page if flag is true.
        if (
          !authState.isAuthenticated &&
          !authState.isAuthenticating &&
          redirectUnauthorized
        ) {
          return redirectUnuauthorized();
        }
        // User is logged out. Show Access Denied page.
        return accessDenied();
      }}
    </AuthContext.Consumer>
  );
};

export default AuthenticatedPage;
