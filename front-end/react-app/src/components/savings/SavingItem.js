import { useContext, useState } from 'react';

import Card from '../ui/Card';
import classes from './css/SavingItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import PlusIcon from '../icons/Plus';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import AddMovementIcon from '../icons/Piggy';
import NewMovementModal from '../movements/NewMovementModal';
import Backdrop from '../Backdrop';

function SavingItem(props) {
    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    const [amountIsVisible, setAmountVisibility] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function addMovementHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

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
                    <div className={classes.inARowContent}>
                        <h3>{props.tagName}</h3>
                        <div className={classes.actionsWrapper}>
                            <div className={classes.actions}>
                                <button className={classes.favourite} onClick={(toggleFavoritesStatusHandler)}>
                                    {itemIsFavorite ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
                                    <p>
                                        {itemIsFavorite ? 'Remove Favourite' : 'Add Favourite'}
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p>{props.tagDescription}</p>
                    <div className={classes.inARowContent}>
                        <p className={classes.currencyName}>{props.currencyName}</p>
                        <h2>$ {amountIsVisible ? props.amount : '**********'}</h2>
                        <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}>
                            { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                        </button>
                    </div> 
                </div>
                <div className={classes.inARowContent}>
                    <div className={classes.actionsWrapper}>
                        <div className={classes.actions}>
                            <div>
                                <button onClick={(addMovementHandler)}>
                                    <AddMovementIcon />
                                    <p>Add Movement</p>
                                </button>
                                {modalIsOpen && <NewMovementModal saving={props} onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                            </div>
                            <button onClick={showSavingMovements}>
                                <PlusIcon />
                                <p>Show Movements</p>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default SavingItem;