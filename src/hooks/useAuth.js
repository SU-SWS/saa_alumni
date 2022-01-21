import { useState, useEffect } from 'react';

export const useAuth = (redirectUnauthorized) => {
  // Initialize variables.
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate auth lookup without making a fetch request.
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthenticated(true);
      setUser({
        email: 'john-doe@list.stanford.edu',
        firstName: 'John',
        lastName: 'Doe',
        SUID: '000123456',
        encodedSUID: '12347589',
        iat: 1642797776,
        exp: 1642840976,
      });
    }, 2000);
  }, [redirectUnauthorized]);

  return {
    user,
    isAuthenticating,
    isAuthenticated,
  };
};
