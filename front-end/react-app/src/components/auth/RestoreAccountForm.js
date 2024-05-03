import { restoreAccount } from "../../data/auth";

const RestoreAccountForm = ({ showRegisterForm, email, password }) => {

    async function submitHandler(event) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const accountData = {
            email: enteredEmail,
            password: enteredPassword,
            newPassword: enteredNewPassword
        };
        const response = await restoreAccount(accountData);
        const msg = response.data.message;
        switch (response.status) {
            case 200:
                NotificationManager.success('Success', `${msg}`, 2000, () => {
                    navigate('/login');
                });
                break;
            case 404:
                NotificationManager.info(`${msg}`); 
                showRegisterForm();
                break;
            default:
                navigate(0);
                break;
        }
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=300" alt="Savings App" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">Restore your account</h2>
            </div>

            <div className="mt-10 flex sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete={email} required ref={emailInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-gray-500 hover:text-green-400" onClick={restorePassword}>Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="" required ref={passwordInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-500">New password</label>
                            </div>
                            <div className="mt-2">
                                <input id="new-password" name="new-password" type="password" autoComplete="" required ref={newPasswordInputRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        <span>Already don't have an account? </span>
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={showRegisterForm}>Register here</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RestoreAccountForm;