import React, { createContext, useReducer, useEffect } from 'react';
import AuthIdleTimeoutOverlay from '../components/auth/AuthIdleTimeoutOverlay';

const initialAuthState = {
  userProfile: null,
  userSession: null,
  isAuthenticated: false,
  isAuthenticating: true,
  isError: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'setAuthenticating':
      return { ...state, isAuthenticating: action.payload };
    case 'setAuthenticated':
      return { ...state, isAuthenticated: action.payload };
    case 'setUserSession':
      return { ...state, userSession: action.payload };
    case 'setUserProfile':
      return { ...state, userProfile: action.payload };
    case 'setError':
      return { ...state, isError: action.payload };
    default:
      return state;
  }
}

const AuthContext = createContext(initialAuthState);
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const sessionUrl = `${window.location.protocol}//${window.location.host}/api/auth/session`;
    const profileUrl = `${window.location.protocol}//${window.location.host}/api/auth/profile`;

    const fetchSession = async () => {
      const res = await fetch(sessionUrl);
      return res.status === 200 ? res.json() : false;
    };

    const fetchProfile = async () => {
      const res = await fetch(profileUrl);
      return res.status === 200 ? res.json() : false;
    };

    const loadAuthData = async () => {
      try {
        const [session, profile] = await Promise.allSettled([
          fetchSession(),
          fetchProfile(),
        ]);

        if (session.status === 'fulfilled' && !session.value) {
          dispatch({ type: 'setAuthenticated', payload: false });
          dispatch({ type: 'setAuthenticating', payload: false });
          return;
        }

        if (profile.status === 'fulfilled' && profile.value) {
          dispatch({ type: 'setUserProfile', payload: profile.value });
        }

        if (Object.keys(profile.value?.affiliation.affiliations).length === 0) {
          dispatch({ type: 'setError', payload: true });
        }

        dispatch({ type: 'setUserSession', payload: session.value });
        dispatch({ type: 'setAuthenticated', payload: true });
        dispatch({ type: 'setAuthenticating', payload: false });
      } catch (error) {
        dispatch({ type: 'setAuthenticated', payload: false });
        dispatch({ type: 'setAuthenticating', payload: false });
        dispatch({ type: 'setError', payload: true });
      }
    };

    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {state.isAuthenticated && <AuthIdleTimeoutOverlay />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
