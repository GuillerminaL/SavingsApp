import { useContext, useState } from 'react';

import Card from '../ui/Card';
import classes from './css/SavingItem.module.css';
import FavoritesContext from '../../store/favorites-context';
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
                image: props.image,
                title: props.title,
                description: props.description,
                amount: props.amount
            });
        }
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <div className={classes.inARowContent}>
                        <h2>$ {amountIsVisible ? props.amount : '**********'}</h2>
                        <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}>
                            { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                        </button>
                    </div> 
                </div>
                <div className={classes.actions}>
                    <button onClick={(toggleFavoritesStatusHandler)}>
                        {itemIsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </Card>
        </li>
    );
}

export default SavingItem;