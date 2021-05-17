import React, { useState, createContext } from 'react';

const AuthContext = createContext({
    token: '',
    user: '',
    isLoggedIn: false,
    login: (token, user, expTime) => {},
    logout: () => {}
});

/**
 * Calculates the remaining time for a token based on expTime provided initially by loginHandler.
 * @param {*} expTime the time stored in localStorage for when the token expires
 * @returns number representing remaining time in milliseconds.
 */
function calcRemainingTime(expTime) {
    return new Date(+expTime).getTime() - new Date().getTime();
}

/**
 * Gets token, user and expiration time from localStorage if the expiration time has not yet been reached.
 * @returns an Object containing token, user and expTime from localStorage, or null if token reached expiration time.
 */
function getTokenUser() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expTime = localStorage.getItem('expTime'); // this is the javascript Date where token expires

    if (calcRemainingTime(expTime) <= 0 ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expTime');
        return null;
    }

    return {
        token: token,
        user: user,
        expTime: expTime
    }
}

export function AuthContextProvider({children}) {
    const localData = getTokenUser();
    const initToken = localData ? localData.token : null;
    const initUser = localData ? localData.user : null;
    const [token, setToken] = useState(initToken);
    const [user, setUser] = useState(initUser);

    const active = !!token; // returns boolean based on whether token exists or not.

    // Maybe Add in a function for refresh token handling?
    
    function logoutHandler() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expTime');
    }
    
    function loginHandler(token, user, expTime) {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('expTime', expTime);
    }

    const ctxValue = {
        token: token,
        user: user,
        isLoggedIn: active,
        login: loginHandler,
        logout: logoutHandler,
      };
      
    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;