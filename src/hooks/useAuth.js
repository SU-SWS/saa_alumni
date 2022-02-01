import { useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const useAuth = (redirectUnauthorized) => {
  const { isAuthenticated, isAuthenticating, user, setAuthState } =
    useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const url = `${window.location.protocol}//${window.location.host}/api/auth/session`;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (!isMounted) return;

        if (body === 'UNAUTHORIZED') {
          setAuthState({
            isAuthenticated: false,
            isAuthenticating: false,
            user: null,
          });

          if (redirectUnauthorized) {
            const returnUrl = window.location.pathname;
            const query = new URLSearchParams({ final_destination: returnUrl });
            window.location = `/api/auth/login?${query.toString()}`;
          }
        } else {
          setAuthState({
            isAuthenticated: true,
            isAuthenticating: false,
            user: body,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [redirectUnauthorized, setAuthState]);

  return {
    user,
    isAuthenticating,
    isAuthenticated,
  };
};
