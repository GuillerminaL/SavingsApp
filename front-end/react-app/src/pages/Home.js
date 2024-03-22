import { useState } from 'react';

import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import SavingsList from '../components/savings/SavingsList';
import NewSavingModal from '../components/savings/NewSavingModal';

const HomePage = () => {
   
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }
    
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
        <section>
            <h1>My Savings...</h1>
            <div className={classes.grid}>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Saving
                    </button>
                </div>
                {modalIsOpen && <NewSavingModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <SavingsList className={classes.card} />
            </div>
        </section>
    );
}

export default HomePage;
