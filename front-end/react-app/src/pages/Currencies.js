import { useState, useEffect } from 'react';

import { fetchCurrencies } from '../data/data';
import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import CurrenciesList from '../components/currencies/CurrenciesList';
import NewCurrencyModal from '../components/currencies/NewCurrencyModal';
import NewCurrencyForm from '../components/currencies/NewCurrencyForm';

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

    useEffect(() => {
        const getData = async () => {
            const currencies = await fetchCurrencies();
            setLoadedCurrencies(currencies);
            setIsLoading(false);
        }
        getData();
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
                <Modal>
                    <NewCurrencyForm />
                </Modal>
                {modalIsOpen && <NewCurrencyModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <CurrenciesList className={classes.card} currencies={loadedCurrencies} />
            </div>
        </section>
    );
}

export default CurrenciesPage;
