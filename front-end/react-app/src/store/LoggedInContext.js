import { createContext, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { APILogin, APISignup } from "../data/auth";

const LoggedInContext = createContext({
    userInfo: {},
    isLoggedIn: false,
    login: (credential) => {},
    logout: () => {}
});

export function LoggedInContextProvider(props) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email') ? true : false);

    async function login(credential) {
        const profile = jwtDecode(credential.credential);
        const loginResponse = await APILogin(profile.email);
        let user;
        if ( loginResponse.status === 200 ) {
            const data = await loginResponse.json();
            user = data.user;
        } else if ( loginResponse.status === 404) {
            const signupResponse = await APISignup(profile);
            if ( signupResponse.status === 409 ) {
                //may offer restore account
                alert('existing mail, user inactive');
                return;
            }
            if ( signupResponse.status === 201 ) {
                const data = await signupResponse.json();
                user = data.newUser;
            }
        } 
        if ( user ) {
            localStorage.setItem('id', user.id);
            localStorage.setItem('email', user.email);
            localStorage.setItem('picture', user.picture);
            localStorage.setItem('given_name', user.given_name);
            localStorage.setItem('family_name', user.family_name);
            setLoggedIn(true);
            navigate('/home');
        } else {
            alert('some problem occur while login in');
            return;
        }
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