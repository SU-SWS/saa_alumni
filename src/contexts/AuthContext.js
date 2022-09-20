import React, { createContext } from 'react';
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

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialAuthState,
    };
  }

  componentDidMount() {
    const sessionUrl = `${window.location.protocol}//${window.location.host}/api/auth/session`;
    const profileUrl = `${window.location.protocol}//${window.location.host}/api/auth/profile`;

    // Get the session.
    const sess = fetch(sessionUrl).then(async (res) => {
      if (res.status === 200) {
        const body = await res.json();
        return body;
      }
      return false;
    });

    // Get the profile.
    const prof = fetch(profileUrl).then(async (res) => {
      if (res.status === 200) {
        const body = await res.json();
        return body;
      }
      return false;
    });

    // To be logged in, session must be available.
    Promise.allSettled([sess, prof])
      .then(([session, profile]) => {
        if (session.status === 'fullfilled' && session.value) {
          this.dispatch({ type: 'setAuthenticated', payload: false });
          this.dispatch({ type: 'setAuthenticating', payload: false });
          return;
        }

        if (profile.status === 'fulfilled' && profile.value) {
          this.dispatch({ type: 'setUserProfile', payload: profile.value });
        }

        if (Object.keys(profile.value?.affiliations).length === 0) {
          this.dispatch({ type: 'setError', payload: true });
        }

        this.dispatch({ type: 'setUserSession', payload: session.value });
        this.dispatch({ type: 'setAuthenticated', payload: true });
        this.dispatch({ type: 'setAuthenticating', payload: false });
      })
      .catch((err) => {
        this.dispatch({ type: 'setAuthenticated', payload: false });
        this.dispatch({ type: 'setAuthenticating', payload: false });
        this.dispatch({ type: 'setError', payload: true });
      });
  }

  reducer(action) {
    const prevState = this.state;
    this.setState(authReducer(prevState, action));
  }

  dispatch(action) {
    this.reducer(action);
  }

  render() {
    const { children } = this.props;
    const {
      userProfile,
      userSession,
      isAuthenticated,
      isAuthenticating,
      isError,
    } = this.state;
    return (
      <AuthContext.Provider
        value={{
          userProfile,
          userSession,
          isAuthenticated,
          isAuthenticating,
          isError,
          setAuthState: this.setAuthState,
        }}
      >
        {isAuthenticated && <AuthIdleTimeoutOverlay />}
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
export { AuthContextProvider };
