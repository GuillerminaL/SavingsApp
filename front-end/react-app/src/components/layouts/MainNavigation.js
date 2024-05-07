import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoggedIn } from '../../store/LoggedInContext';

const MainNavigation = () => {
    const { logout } = useLoggedIn();
    const [currentLocation, setCurrentLocation] = useState(window.location);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toggleMobileMenu = () => setShowMobileMenu((previousState) => !previousState);

    useEffect(() => {
        setCurrentLocation(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <header className="sticky top-0 flex flex-col rounded-2xl bg-gray-800 p-4 shadow-lg z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-white">
                    <a href="/">
                        <h1 className="self-center whitespace-nowrap text-2xl font-semibold text-white">Savings App</h1>
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex items-center space-x-8">
                        <li><Link to="/home" className={`rounded-md p-2 text-white transition duration-300 ease-in hover:bg-green-500 ${ currentLocation === '/home' ? 'bg-green-500' : ''}`}>Home</Link></li>
                        <li><Link to="/savings" className={`rounded-md p-2 text-white transition duration-300 ease-in hover:bg-green-500 ${ currentLocation === '/savings' ? 'bg-green-500' : ''}`}>Savings</Link></li>
                        <li><Link to="/currencies" className={`rounded-md p-2 text-white transition duration-300 ease-in hover:bg-green-500 ${ currentLocation === '/currencies' ? 'bg-green-500' : ''}`}>Currencies</Link></li>
                        <li><Link to="/tags" className={`rounded-md p-2 text-white transition duration-300 ease-in hover:bg-green-500 ${ currentLocation === '/tags' ? 'bg-green-500' : ''}`}>Tags</Link></li>
                        <li className='flex items-center'>
                            <div className="w-[30px] h-[30px] overflow-hidden border-1 border-white rounded-full">
                                <img src={localStorage.getItem('picture')} />
                            </div>
                            
                            <button className="rounded-md p-2 text-white transition duration-300 ease-in hover:bg-green-500" onClick={logout}>Sign Out</button>
                        </li>
                    </ul>
                </div>
                <div className="md:hidden">
                    <button className="mobile-menu-button outline-none" onClick={toggleMobileMenu}> 
                    <svg className="size-6 text-white" xshow="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    </button>
                </div>
                </div>
                {showMobileMenu &&                 
                    <div className="mobile-menu lg:hidden">
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/home" className="block rounded-md bg-gray-900 p-2 px-4 text-white hover:bg-green-500">Home</Link></li>
                            <li><Link to="/savings" className="block rounded-md bg-gray-900 p-2 px-4 text-white hover:bg-green-500">Savings</Link></li>
                            <li><Link to="/currencies" className="block rounded-md bg-gray-900 p-2 px-4 text-white hover:bg-green-500">Currencies</Link></li>
                            <li><Link to="/tags" className="block rounded-md bg-gray-900 p-2 px-4 text-white hover:bg-green-500">Tags</Link></li>
                        </ul>
                    </div>    
                }
            </nav>
        </header>
    );
}

export default MainNavigation;