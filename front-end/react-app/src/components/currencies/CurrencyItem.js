import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import Card from '../ui/card/Card';
import classes from './css/CurrencyItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import EditIcon from '../icons/Pen';
import TrashIcon from '../icons/Trash';

const CurrencyItem = (props) => {
    const navigate = useNavigate();
    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    async function editCurrency() {
        //TODO Patch name and imageUrl
        console.log("editing " + props.name);
    }

    async function deleteCurrency() {
        const response = await deleteData('currencies', props.id);
        alert(response.status, response.message);
        navigate(0);
    }

    function toggleFavoritesStatusHandler() {
        if (itemIsFavorite) {
            favoritesCtx.removeFavorite(props.id);
        } else {
            favoritesCtx.addFavorite({
                id: props.id,
                image: props.image,
                name: props.name,
                amount: props.amount
            });
        }
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.name} />
                </div>
                <div className={classes.content}> 
                    <h3>{props.name}</h3>
                    <div className={classes.inARowContent}> 
                        <div className={classes.actions}>
                            {/* TODO */}
                            <button onClick={(editCurrency)}>
                                <EditIcon></EditIcon>
                                <p>Edit</p>
                            </button>
                            <button onClick={(deleteCurrency)}>
                                <TrashIcon></TrashIcon>
                                <p>Remove</p>
                            </button>
                            <button className={classes.favourite} onClick={(toggleFavoritesStatusHandler)}>
                                {itemIsFavorite ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
                                <p>
                                    {itemIsFavorite ? 'Remove Favourite' : 'Add Favourite'}
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default CurrencyItem;