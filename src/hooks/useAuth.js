import { useState, useEffect } from 'react';
import fetch from 'node-fetch';

export const useAuth = (redirectUnauthorized) => {
  // Initialize variables.
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const url = `${window.location.protocol}//${window.location.host}/api/sso/session`;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (!isMounted) return;

        if (body === 'UNAUTHORIZED') {
          setIsAuthenticating(false);
          setAuthenticated(false);
          setUser(null);
          if (redirectUnauthorized) {
            const returnUrl = window.location.pathname;
            const query = new URLSearchParams({ final_destination: returnUrl });
            window.location = `/api/sso/login?${query.toString()}`;
          }
        } else {
          setIsAuthenticating(false);
          setUser(body);
          setAuthenticated(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [redirectUnauthorized]);

  return {
    user,
    isAuthenticating,
    isAuthenticated,
  };
};
