import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './css/MainNavigation.module.css';
import FavoritesContext from '../../store/favorites-context';


const MainNavigation = () => {
    const favoritesCtx = useContext(FavoritesContext);

    return (
        <header className={classes.header}>
            <div className={classes.logo}>Savings App</div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/currencies'>Currencies</Link></li>
                    <li><Link to='/tags'>Tags</Link></li>
                    <li><Link to='/favorites'>
                            Favorites
                            <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default MainNavigation;