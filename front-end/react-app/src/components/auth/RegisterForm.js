import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager} from 'react-notifications';

import GoogleLoginHandler from '../auth/GoogleLoginHandler';
import { manualRegister } from '../../data/auth';

const RegisterForm = () => {
    const navigate = useNavigate();

    const givenNameInputRef = useRef();
    const familyNameInputRef = useRef();
    const emailInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredGivenName = givenNameInputRef.current.value;
        const enteredFamilyName = familyNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        if ( !enteredGivenName || !enteredFamilyName || !enteredEmail || !enteredPassword || !enteredConfirmPassword ) {
            NotificationManager.error('Error', `All fields are required`);
        }
        if ( enteredPassword !== enteredConfirmPassword ) {
            NotificationManager.error('Error', `Password and Confirm Password must be equal`);
            return;
        }
        const registerData = {
            email: enteredEmail,
            password: enteredPassword,
            given_name: enteredGivenName,
            family_name: enteredFamilyName
        };
        const response = await manualRegister(registerData);
        const msg = response.data.message;
        switch (response.status) {
            case 201:
                NotificationManager.success('Success', `${msg}`, 1000);
                navigate('/login');
                break;
            case 400:
                NotificationManager.warning('Warning', `${msg}`, 1000);
                navigate('/login');
                break;
            case 409:
                NotificationManager.warning('Error', `${msg}. \n Click to restore account`, 5000, () => {
                    console.log("Show form to restore");
                });
                break;
            default:
                navigate(0);
                break;
        }      
    }

    return (
        <>
            <NotificationContainer/>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=300" alt="Savings App" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">Savings App</h2>
                    <h3 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">Sign Up</h3>
                </div>

                <div className="flex flex-col self-center p-5">
                    <GoogleLoginHandler />
                    <p className='self-center border-b border-gray-700 p-2 font-bold text-gray-500'>or</p>
                </div>

                <div className="mt-10 flex sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="givenName" className="block text-sm font-medium leading-6 text-gray-500">Given Name</label>
                                <div className="mt-2">
                                    <input id="givenName" name="givenName" type="text" autoComplete="givenName" required ref={givenNameInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="familyName" className="block text-sm font-medium leading-6 text-gray-500">Family Name</label>
                                <div className="mt-2">
                                    <input id="familyName" name="familyName" type="text" autoComplete="familyName" required ref={familyNameInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required ref={emailInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">Password</label>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="" required ref={passwordInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-500">Confirm Password</label>
                                <div className="mt-2">
                                    <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="" required ref={confirmPasswordInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <span>Already have an account? </span>
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;