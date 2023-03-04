import React from 'react';

const AuthContext = React.createContext({
  token: '',
  user: {},
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState({});

  const userIsLoggedIn = !!token;

  const loginHandler = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logoutHandler = () => {
    setToken(null);
    setUser({});
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
