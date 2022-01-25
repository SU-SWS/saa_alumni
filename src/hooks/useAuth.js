import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = (redirectUnauthorized) => {
  // Initialize variables.
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const url = `${window.location.protocol}//${window.location.host}/events`;
    axios.get(url).then((res) => {
      console.log(res.status);
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
