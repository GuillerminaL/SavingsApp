import { useState } from 'react';

import classes from './css/HomePage.module.css';
import Backdrop from '../components/ui/Backdrop';
import Modal from '../components/ui/modals/Modal';
import CurrenciesList from '../components/currencies/CurrenciesList';
import NewCurrencyForm from '../components/currencies/NewCurrencyForm';

const CurrenciesPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
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
                {modalIsOpen && <Modal title={"New Currency"} onCancel={closeModalHandler} onConfirm={closeModalHandler}>
                                    <NewCurrencyForm  className={classes.form} onSubmitSuccess={closeModalHandler} />
                                </Modal>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <CurrenciesList className={classes.card} />
            </div>
        </section>
    );
}

export default CurrenciesPage;
