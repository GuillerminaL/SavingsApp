import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('email')) {
            navigate('/login');
        }
    })
    return (
        <div className="flex flex-col items-center bg-gray-900 justify-center min-h-screen">
            <div className="container  m-4">
                <div className="max-w-3xl w-full mx-auto grid gap-4 grid-cols-1">
                    <MainNavigation />
                    <main className="w-full m-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Layout;