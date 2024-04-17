import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoggedIn } from '../../store/LoggedInContext';

const MainNavigation = () => {
    const { logout } = useLoggedIn();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toggleMobileMenu = () => setShowMobileMenu((previousState) => !previousState);

    return (
        <header className="flex flex-col sticky top-0 z-10 bg-gray-800 shadow-lg rounded-2xl p-4">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                <div className="text-white font-bold text-xl">
                    <a href="/">
                        <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-white">Savings App</h1>
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex items-center space-x-8">
                        <li><Link to="/" className="text-white hover:bg-green-500 p-2 rounded-md transition ease-in duration-300">Home</Link></li>
                        <li><Link to="/savings" className="text-white hover:bg-green-500 p-2 rounded-md transition ease-in duration-300">Savings</Link></li>
                        <li><Link to="/currencies" className="text-white hover:bg-green-500 p-2 rounded-md transition ease-in duration-300">Currencies</Link></li>
                        <li><Link to="/tags" className="text-white hover:bg-green-500 p-2 rounded-md transition ease-in duration-300">Tags</Link></li>
                        <li><button className="text-white hover:bg-green-500 p-2 rounded-md transition ease-in duration-300" onClick={logout}>Sign Out</button></li>
                    </ul>
                </div>
                <div className="md:hidden">
                    <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}> 
                    <svg className="w-6 h-6 text-white" xshow="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    </button>
                </div>
                </div>
                {showMobileMenu &&                 
                    <div className="mobile-menu lg:hidden">
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/" className="block px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-green-500 p-2">Home</Link></li>
                            <li><Link to="/savings" className="block px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-green-500 p-2">Savings</Link></li>
                            <li><Link to="/currencies" className="block px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-green-500 p-2">Currencies</Link></li>
                            <li><Link to="/tags" className="block px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-green-500 p-2">Tags</Link></li>
                        </ul>
                    </div>    
                }
            </nav>
        </header>
    );
}

export default MainNavigation;