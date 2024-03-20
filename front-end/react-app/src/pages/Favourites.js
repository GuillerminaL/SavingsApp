import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";
import classes from './css/FavouritesPage.module.css';
import SavingsList from "../components/savings/SavingsList";

function FavoritesPage () {
    const favoritesCtx = useContext(FavoritesContext);

    let content;

    if (favoritesCtx.totalFavorites > 0) {
        content = <SavingsList savings={favoritesCtx.favorites} />;
    } else {
        content = <h3>You got no favorites yet. Start adding some?</h3>;
    }

    return (
        <section>
            <h1> My Favorites </h1>
            <div className={classes.grid}>
                {content}
            </div>
        </section>
    );
}

export default FavoritesPage;