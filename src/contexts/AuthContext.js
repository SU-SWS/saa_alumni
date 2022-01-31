import React, { createContext } from 'react';
import AuthIdleTimeoutOverlay from '../components/auth/AuthIdleTimeoutOverlay';

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

const AuthContext = createContext(initialAuthState);

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialAuthState,
    };
  }

  setAuthState = (values) => {
    const newState = { ...this.state, ...values };
    this.setState(newState);
  };

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
