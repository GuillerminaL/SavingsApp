import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteSaving) => {},
    removeFavorite: (savingId) => {},
    itemIsFavorite: (savingId) => {}
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([]);

    function addFavoriteHandler(favoriteSaving) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteSaving);
        });
    }

    function removeFavoriteHandler(savingId) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.filter(saving => saving.id !== savingId);
        });
    }

    function itemIsFavoriteHandler(savingId) {
        return userFavorites.some(saving => saving.id === savingId);
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };

    return (
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;