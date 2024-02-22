import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../ui/Card';
import classes from './css/CurrencyDetail.module.css';
import PlusIcon from '../icons/Plus';
import AddSavingIcon from '../icons/AddSaving';
import SustractSavingIcon from '../icons/SustractSaving'
import FavoritesContext from '../../store/favorites-context';
import FavoriteOnIcon from '../icons/FavouriteOn';
import FavoriteOffIcon from '../icons/FavouriteOff';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import NewSavingModal from '../savings/NewSavingModal';
import Backdrop from '../Backdrop';

function CurrencyItem(props) {

    const navigate = useNavigate();

    const favoritesCtx = useContext(FavoritesContext);
    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    const [amountIsVisible, setAmountVisibility] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function addSavingAmountHandler() {
        setModalIsOpen(true);
    }

    function sustractSavingAmountHandler() {

    }

    function showMovementsDetail() {
        navigate('/currencyDetail');
    }

    function toggleFavoritesStatusHandler() {
        if (itemIsFavorite) {
            favoritesCtx.removeFavorite(props.id);
        } else {
            favoritesCtx.addFavorite({
                id: props.id,
                image: props.image,
                currencyName: props.currencyName,
                amount: props.amount
            });
        }
    }

    return (
        <div className={classes.wrapper}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.currencyName} />
                </div>
                <div className={classes.content}>
                    <div className={classes.inARowContent}> 
                        <h3>{props.currencyName}</h3>
                        <div className={classes.actions}>
                            <button className={classes.favourite} onClick={(toggleFavoritesStatusHandler)}>
                                {itemIsFavorite ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
                                <p>
                                    {itemIsFavorite ? 'Remove Favourite' : 'Add Favourite'}
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className={classes.inARowContent}>
                        <h2>$ {amountIsVisible ? props.amount : '**********'}</h2>
                        <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}>
                            { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                        </button>
                    </div>
                    <div className={classes.actionsWrapper}>
                        <div className={classes.actions}>
                            <div>
                                <button onClick={(addSavingAmountHandler)}>
                                    <AddSavingIcon />
                                    <p>Add Saving Amount</p>
                                </button>
                            </div>
                            {modalIsOpen && <NewSavingModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                        </div>
                        <div className={classes.actions}>
                            <button onClick={(sustractSavingAmountHandler)}>
                                <SustractSavingIcon />
                                <p>Sustract Saving Amount</p>
                            </button>
                        </div>
                    </div>
                    <div className={classes.inARowContent}>
                        <h2>Detail</h2>
                        <div className={classes.actions}>
                            <button onClick={showMovementsDetail}>
                                <PlusIcon />
                                <p>Movements</p>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CurrencyItem;