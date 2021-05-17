import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext({
    token: '',
    user: '',
    active: false,
    login: (token) => {},
    logout: () => {}
});

function getTokenUser() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const expTime = localStorage.getItem('expTime');
}

export function AuthContextProvider({children}) {
    

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    function loginHandler() {

    }

    function logoutHandler() {

    }

    const active = !!token;

    const ctxValue = {
        token: token,
        user: user,
        active: active,
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