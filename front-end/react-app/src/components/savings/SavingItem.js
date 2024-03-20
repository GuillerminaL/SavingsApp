import { useContext, useState } from 'react';

import Card from '../ui/Card';
import classes from './css/SavingItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import PlusIcon from '../icons/Plus';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';

function SavingItem(props) {
    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    const [amountIsVisible, setAmountVisibility] = useState(false);

    function toggleFavoritesStatusHandler() {
        if (itemIsFavorite) {
            favoritesCtx.removeFavorite(props.id);
        } else {
            favoritesCtx.addFavorite({
                id: props.id,
                currencyId: props.currencyId,
                currencyName: props.currencyName,
                currencyImage: props.currencyImage,
                tagId: props.tagId,
                tagName: props.tagName,
                tagDescription: props.tagDescription,
                amount: props.amount
            });
        }
    }

    function showSavingMovements() {
        console.log("showMovements");
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.currencyImage} alt={props.tagName} />
                </div>
                <div className={classes.content}>
                    <h3>{props.tagName}</h3>
                    <p>{props.tagDescription}</p>
                    <div className={classes.inARowContent}>
                        <p className={classes.currencyName}>{props.currencyName}</p>
                        <h2>$ {amountIsVisible ? props.amount : '**********'}</h2>
                        <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}>
                            { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                        </button>
                    </div> 
                </div>
                <div className={classes.actionsWrapper}>
                        <div className={classes.actions}>
                            <button onClick={showSavingMovements}>
                                <PlusIcon />
                                <p>Show detail</p>
                            </button>
                            <button className={classes.favourite} onClick={(toggleFavoritesStatusHandler)}>
                                {itemIsFavorite ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
                                <p>
                                    {itemIsFavorite ? 'Remove Favourite' : 'Add Favourite'}
                                </p>
                            </button>
                        </div>
                    </div>
            </Card>
        </li>
    );
}

export default SavingItem;