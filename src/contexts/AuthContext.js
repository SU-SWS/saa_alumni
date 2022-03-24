import React, { createContext } from 'react';
import AuthIdleTimeoutOverlay from '../components/auth/AuthIdleTimeoutOverlay';
import setGiveGabVars from '../utilities/giveGabVars';

const initialAuthState = {
  userProfile: null,
  isAuthenticated: false,
  isAuthenticating: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'setAuthenticating':
      return { ...state, isAuthenticating: action.payload };
    case 'setAuthenticated':
      return { ...state, isAuthenticated: action.payload };
    case 'setUserProfile':
      return { ...state, userProfile: action.payload };
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
    const url = `${window.location.protocol}//${window.location.host}/api/auth/profile`;
    fetch(url).then(async (res) => {
      if (res.status === 200) {
        const body = await res.json();
        setGiveGabVars(body);
        this.dispatch({ type: 'setAuthenticated', payload: true });
        this.dispatch({ type: 'setUserProfile', payload: body });
        this.dispatch({ type: 'setAuthenticating', payload: false });
      } else {
        this.dispatch({ type: 'setAuthenticated', payload: false });
        this.dispatch({ type: 'setUserProfile', payload: null });
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
    const { userProfile, isAuthenticated, isAuthenticating } = this.state;
    return (
      <AuthContext.Provider
        value={{
          userProfile,
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
