import { createContext, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const LoggedInContext = createContext({
    userInfo: {},
    isLoggedIn: false,
    login: (credential) => {},
    logout: () => {}
});

export function LoggedInContextProvider(props) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email') ? true : false);

    function login(credential) {
        const profile = jwtDecode(credential.credential);
        localStorage.setItem('email', profile.email);
        localStorage.setItem('picture', profile.picture);
        localStorage.setItem('name', profile.given_name + " " + profile.family_name);
        setLoggedIn(true);
        // fetch to database and get id from user
        navigate('/home');
    }

    function logout() {
        setLoggedIn(false);
        googleLogout();
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        navigate('/login');
    }

    const context = {
        login,
        logout,
        isLoggedIn: loggedIn,    
    };

    return (
        <LoggedInContext.Provider value={context}>
            {props.children}
        </LoggedInContext.Provider>
    );
}

export function useLoggedIn() {
    const context = useContext(LoggedInContext);
    return context;    
}

export default LoggedInContext;