import { useEffect, useState } from 'react';
import fetch from 'node-fetch';

export const useAuth = (redirectUnauthorized) => {
  // Initialize variables.
  const [user, setUser] = useState(null);
  //const [isAuthenticating, setIsAuthenticating] = useState(true);
  //const [isAuthenticated, setAuthenticated] = useState(false);
  const isAuthenticating = true;
  const isAuthenticated = false;

  useEffect(() => {
    // const url = `${window.location.protocol}//${window.location.host}/api/session`;
    // fetch(url, { follow: 0 })
    //   .then((res) => res.json())
    //   .then((body) => {
    //     if (body === 'UNAUTHORIZED') {
    //       setIsAuthenticating(false);
    //       setAuthenticated(false);
    //       setUser(null);
    //       if (redirectUnauthorized) {
    //         const returnUrl = window.location.pathname;
    //         const query = new URLSearchParams({ final_destination: returnUrl });
    //         window.location = `/api/login?${query.toString()}`;
    //       }
    //     } else {
    //       setIsAuthenticating(false);
    //       setUser(body);
    //       setAuthenticated(true);
    //     }
    //   });
  }, [redirectUnauthorized]);

  return {
    user,
    isAuthenticating,
    isAuthenticated,
  };
};
