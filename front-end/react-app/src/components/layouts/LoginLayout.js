import LoginPage from '../../pages/LoginPage';

const LoginLayout = () => {
    return (
        <div className="flex flex-col items-center bg-gray-900 justify-center min-h-screen">
            <div className="container  m-4">
                <div className="max-w-3xl w-full mx-auto grid gap-4 grid-cols-1">
                    <main className="w-full m-auto">
                        <LoginPage />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;