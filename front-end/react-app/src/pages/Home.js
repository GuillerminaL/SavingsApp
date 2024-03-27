import { useState } from 'react';

import classes from './css/HomePage.module.css';
import Backdrop from '../components/ui/Backdrop';
import Modal from '../components/ui/modals/Modal';
import SavingsList from '../components/savings/SavingsList';
import NewSavingForm from '../components/savings/NewSavingForm';

const HomePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }
    
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
        <section className="w-5/6 m-auto">
            <h1>My Savings...</h1>
            <div>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Saving
                    </button>
                </div>
                {modalIsOpen && <Modal title={"New Saving"} onCancel={closeModalHandler} onConfirm={closeModalHandler}>
                                    <NewSavingForm  className={classes.form} onSubmitSuccess={closeModalHandler} />
                                </Modal>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <SavingsList className={classes.card} />
            </div>
        </section>
    );
}

export default HomePage;
