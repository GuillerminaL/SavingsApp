import { useState, useEffect } from 'react';
import CurrenciesList from '../components/currencies/CurrenciesList';
import classes from './css/HomePage.module.css';

import NewCurrencyModal from '../components/currencies/NewCurrencyModal';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function addNewCurrencyHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetch('https://savings-app-b2edb-default-rtdb.firebaseio.com/currencies.json')
            .then((response) => { 
                return response.json(); 
            })
            .then((data) => { 
                const currencies = []; 

                for (const key in data) {
                    const currency = {
                        id: key,
                        currencyName: data[key].currencyName,
                        amount: data[key].amount,
                        image: data[key].image
                    };
                    currencies.push(currency);
                }

                setIsLoading(false); 
                setLoadedCurrencies(currencies);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <div className={classes.grid}>
            <div className={classes.actions}>
                <button onClick={addNewCurrencyHandler}>
                     + New Currency Saving
                </button>
            </div>
            {modalIsOpen && <NewCurrencyModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
            <CurrenciesList className={classes.card} currencies={loadedCurrencies}></CurrenciesList>
        </div>
    );

}

export default HomePage;
