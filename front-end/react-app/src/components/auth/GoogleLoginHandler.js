import { GoogleLogin } from '@react-oauth/google';
import { useLoggedIn } from '../../store/LoggedInContext';

const GoogleLoginHandler = () => {
    const { login } = useLoggedIn();
    return (
        <GoogleLogin
            onSuccess={login}
            onError={() => console.log('Login Failed')}
        /> 
    );
}

export default GoogleLoginHandler;