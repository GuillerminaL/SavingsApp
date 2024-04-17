import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const GoogleLoginHandler = () => {
    const navigate = useNavigate();

    function onSucess(credentialResponse) {
        const profile = jwtDecode(credentialResponse.credential);
        localStorage.setItem('email', profile.email);
        localStorage.setItem('picture', profile.picture);
        localStorage.setItem('name', profile.given_name + " " + profile.family_name);
        // fetch to database and get id from user
        navigate('/home');
    }

    function onError() {
        console.log('Login Failed');
    }

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {onSucess(credentialResponse)}}
            onError={onError}
        /> 
    );
}

export default GoogleLoginHandler;