import { useContext, useState } from 'react';

import Card from '../ui/card/Card';
import classes from './css/SavingItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import PlusIcon from '../icons/Plus';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import AddMovementIcon from '../icons/Piggy';
import Modal from '../ui/modals/Modal';
import Backdrop from '../ui/Backdrop';
import MovementsList from '../movements/MovementsList';
import NewMovementForm from '../movements/NewMovementForm';


const SavingItem = (props) => {
    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    const [amountIsVisible, setAmountVisibility] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movementsListModalIsOpen, setMovementsListModalIsOpen] = useState(false);

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

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.currencyImage} alt={props.tagName} />
                </div>
                <div className={classes.content}>
                    <div className={classes.inARowContent}>
                        <h3>{props.tagName}</h3>
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
                                <button onClick={() => {setMovementsListModalIsOpen(true);}}>
                                    <PlusIcon />
                                    <p>Show Movements</p>
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {setModalIsOpen(true);}}>
                                    <AddMovementIcon />
                                    <p>Add Movement</p>
                                </button>
                            </div>
                            <div>
                                <button className={classes.favourite} onClick={(toggleFavoritesStatusHandler)}>
                                    {itemIsFavorite ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
                                    <p>
                                        {itemIsFavorite ? 'Remove Favourite' : 'Add Favourite'}
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            {movementsListModalIsOpen && <Modal title={"Movements Detail"} onCancel={() => {setMovementsListModalIsOpen(false);}} onConfirm={() => {setMovementsListModalIsOpen(false);}}>
                                            <div className={classes.control}>
                                                <h3>Saving: {props.tagName}</h3>
                                                <h3>Currency: {props.currencyName}</h3>
                                            </div>
                                            <MovementsList savingId={props.id} />
                                        </Modal>}
            {movementsListModalIsOpen && <Backdrop onClick={() => {setMovementsListModalIsOpen(false);}}/>}
            
            {modalIsOpen && <Modal title={"New Movement"} onCancel={() => {setModalIsOpen(false);}} onConfirm={() => {setModalIsOpen(false);}}>
                                <NewMovementForm className={classes.form} onSubmitSuccess={() => {setModalIsOpen(false);}} />
                            </Modal>}
            {modalIsOpen && <Backdrop onClick={() => {setModalIsOpen(false);}}/>}           
        </li>
    );
}

export default SavingItem;