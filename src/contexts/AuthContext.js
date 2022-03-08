import React, { createContext } from 'react';
import AuthIdleTimeoutOverlay from '../components/auth/AuthIdleTimeoutOverlay';

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'setAuthenticating':
      return { ...state, isAuthenticating: action.payload };
    case 'setAuthenticated':
      return { ...state, isAuthenticated: action.payload };
    case 'setUser':
      return { ...state, user: action.payload };
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
    const url = `${window.location.protocol}//${window.location.host}/api/auth/session`;
    fetch(url).then(async (res) => {
      if (res.status === 200) {
        const body = await res.json();
        this.dispatch({ type: 'setAuthenticated', payload: true });
        this.dispatch({ type: 'setUser', payload: body });
        this.dispatch({ type: 'setAuthenticating', payload: false });
      } else {
        this.dispatch({ type: 'setAuthenticated', payload: false });
        this.dispatch({ type: 'setUser', payload: null });
        this.dispatch({ type: 'setAuthenticating', payload: false });
      }
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
    const { user, isAuthenticated, isAuthenticating } = this.state;
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          isAuthenticating,
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
