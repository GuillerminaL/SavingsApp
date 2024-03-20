import { useState, useEffect } from 'react';

import { API_HOST } from '../config/index';
import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import CurrenciesList from '../components/currencies/CurrenciesList';
import NewCurrencyModal from '../components/currencies/NewCurrencyModal';


function CurrenciesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    async function fetchData() {
        try {
            const response = await fetch(`${API_HOST}/currencies`);
            const data = await response.json();
            const currencies = []; 
            for (const key in data.currencies) {
                const currency = {
                    id: data.currencies[key]._id,
                    name: data.currencies[key].name,
                    image: data.currencies[key].imageUrl,
                };
                currencies.push(currency);
            }
            setIsLoading(false); 
            setLoadedCurrencies(currencies);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <section>
            <h1>My Currencies...</h1>
            <div className={classes.grid}>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Currency
                    </button>
                </div>
                {modalIsOpen && <NewCurrencyModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <CurrenciesList className={classes.card} currencies={loadedCurrencies}></CurrenciesList>
            </div>
        </section>
    );
}

export default CurrenciesPage;
