import { createContext, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const LoggedInUserContext = createContext({
    userInfo: {},
    isLoggedIn: false,
    saveLoggedInUser: ({ auth, user}) => {},
    logout: () => {}
});

export function LoggedInUserContextProvider(props) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email') ? true : false);

    function saveLoggedInUser({auth, user}) {
        localStorage.setItem('token', auth.token);
        localStorage.setItem('expiryDate', auth.expiryDate);
        localStorage.setItem('refreshToken', auth.refreshToken);
        localStorage.setItem('id', user.id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('picture', user.photoURL);
        localStorage.setItem('given_name', user.given_name);
        localStorage.setItem('family_name', user.family_name);
        setLoggedIn(true);
    }

    function logout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('picture');
        localStorage.removeItem('given_name');
        localStorage.removeItem('family_name');
        navigate('/login');
    }

    const context = {
        saveLoggedInUser,
        logout,
        isLoggedIn: loggedIn,
    };

    return (
        <LoggedInUserContext.Provider value={context}>
            {props.children}
        </LoggedInUserContext.Provider>
    );
}

export function useLoggedInUser() {
    const context = useContext(LoggedInUserContext);
    return context;    
}

export default LoggedInUserContext;