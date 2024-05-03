import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import GoogleLoginHandler from '../auth/GoogleLoginHandler';
import { useLoggedInUser } from '../../store/LoggedInUserContext'; 
import { manualLogin } from '../../data/auth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { saveLoggedInUser } = useLoggedInUser();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = {
            email: enteredEmail,
            password: enteredPassword
        };
        const response = await manualLogin(data);
        const msg = response.data.message;
        switch (response.status) {
            case 200:
                saveLoggedInUser(response.data);
                NotificationManager.success('Success', `${msg}`, 1000);
                navigate('/home');
                break;
            case 404:
                NotificationManager.info(`${msg}`); 
                navigate('/register');
                break;
            case 400:
                if (msg === `Incorrect password`) {
                    NotificationManager.error('Error', `${msg}`, 3000);
                }
                if (msg === `Inactive user account`) { 
                    NotificationManager.warning('Warning', `${msg}. \n Click to restore`, 5000, () => {
                        console.log("Show form to restore");
                    });
                    //Ask for restore...
                }
                break;
            default:
                navigate('/login');
                break;
        }
    }

    function restorePassword() {
        console.log("restore password");
    }

    return (
        <>
            <NotificationContainer/>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=300" alt="Savings App" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">Sign in to your account</h2>
                </div>

                <div className="flex flex-col self-center p-5">
                    <GoogleLoginHandler />
                    <p className='self-center border-b border-gray-700 p-2 font-bold text-gray-500'>or</p>
                </div>

                <div className="mt-10 flex sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required ref={emailInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">Password</label>
                                    <div className="text-sm">
                                        <a href="/" className="font-semibold text-gray-500 hover:text-green-400" onClick={restorePassword}>Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required ref={passwordInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <span>Don't have an account yet? </span>
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up here</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;