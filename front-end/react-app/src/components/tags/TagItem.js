import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import Card from '../ui/card/Card';
import classes from './css/TagItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import EditIcon from '../icons/Pen';
import TrashIcon from '../icons/Trash';

const TagItem = (props) => {
    const navigate = useNavigate();
    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    async function editTag() {
        //TODO Patch name and description
        console.log("editing " + props.name);
    }

    async function deleteTag() {
        const response = await deleteData('tags', props.id);
        if ( response.status === 200 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
        }
    }

    function toggleFavoritesStatusHandler() {
        if (itemIsFavorite) {
            favoritesCtx.removeFavorite(props.id);
        } else {
            favoritesCtx.addFavorite({
                id: props.id,
                name: props.name,
                description: props.description
            });
        }
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <div className={classes.inARowContent}> 
                        <div className={classes.actions}>
                            {/* TODO */}
                            <button onClick={(editTag)}>
                                <EditIcon></EditIcon>
                                <p>Edit</p>
                            </button>
                            <button onClick={(deleteTag)}>
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

export default TagItem;