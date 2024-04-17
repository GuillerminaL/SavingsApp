import GoogleLoginHandler from "../components/auth/GoogleLoginHandler";

const LoginPage = () => {

    return (
        <section className="bg-gray-800 p-5 rounded-2xl">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-100">
                    Savings App    
                </h1>  
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                            Welcome
                        </h1>
                        <div className="flex justify-center">
                            <GoogleLoginHandler />
                        </div>
                    </div>
                </div>            
            </div>
        </section>
    );
}

export default LoginPage;