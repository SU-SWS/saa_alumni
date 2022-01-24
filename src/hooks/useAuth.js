import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = (redirectUnauthorized) => {
  // Initialize variables.
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const url = `${window.location.protocol}//${window.location.host}/api/session`;
    axios.get(url).then((res) => {
      if (!isMounted) return;

      if (res.status === 200) {
        setIsAuthenticating(false);
        setUser(res.data);
        setAuthenticated(true);
      } else {
        setIsAuthenticating(false);
        setAuthenticated(false);
        setUser(null);
        // if (redirectUnauthorized) {
        //   const returnUrl = window.location.pathname;
        //   const query = new URLSearchParams({ final_destination: returnUrl });
        //   window.location = `/api/login?${query.toString()}`;
        // }
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
