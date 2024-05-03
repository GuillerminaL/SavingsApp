import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../store/LoggedInUserContext';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useLoggedInUser();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    })
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
            <div className="container  m-4">
                <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4">
                    <MainNavigation />
                    <main className="m-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Layout;