import React, { createContext } from 'react';
import AuthIdleTimeoutOverlay from '../components/auth/AuthIdleTimeoutOverlay';
import setGiveGabVars from '../utilities/giveGabVars';

const initialAuthState = {
  user: null,
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
    case 'setUser':
      return { ...state, user: action.payload };
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
    const userUrl = `${window.location.protocol}//${window.location.host}/api/auth/session`;
    fetch(userUrl).then(async (res) => {
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

    const mpUrl = `${window.location.protocol}//${window.location.host}/api/mega/profile`;
    fetch(mpUrl).then(async (res) => {
      if (res.status === 200) {
        const mpData = await res.json();
        setGiveGabVars(mpData);
        this.dispatch({ type: 'setUserProfile', payload: mpData });
      } else {
        console.error('Could not load mega profile data.');
        this.dispatch({ type: 'setUserProfile', payload: null });
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
    const { user, userProfile, isAuthenticated, isAuthenticating } = this.state;
    return (
      <AuthContext.Provider
        value={{
          user,
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
