import { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoritesContext from '../../store/favorites-context';


const MainNavigation = () => {
    const favoritesCtx = useContext(FavoritesContext);

    return (
        <header className="bg-white border-gray-100 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Savings App</h1>
                <nav className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li><Link to='/' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Home</Link></li>
                        <li><Link to='/currencies' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Currencies</Link></li>
                        <li><Link to='/tags' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tags</Link></li>
                        <li><Link to='/favorites' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                Favorites
                                <span className="bg-red-600 text-white rounded py-1 px-2 ml-1 text-sm">{favoritesCtx.totalFavorites}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </header>
    );

}

export default MainNavigation;