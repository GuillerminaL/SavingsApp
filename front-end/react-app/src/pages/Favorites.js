import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";
import CurrenciesList from "../components/currencies/CurrenciesList";

function FavoritesPage () {
    const favoritesCtx = useContext(FavoritesContext);

    let content;

    if (favoritesCtx.totalFavorites > 0) {
        content = <CurrenciesList currencies={favoritesCtx.favorites} />;
    } else {
        content = <h3>You got no favorites yet. Start adding some?</h3>;
    }

    return (
        <section>
            <h1> My Favorites </h1>
            {content}
        </section>
    );
}

export default FavoritesPage;