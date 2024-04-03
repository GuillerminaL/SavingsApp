import { useState } from 'react';

import classes from './css/HomePage.module.css';
import Backdrop from '../components/ui/Backdrop';
import Modal from '../components/ui/modals/Modal';
import SavingsList from '../components/savings/SavingsList';
import NewSavingForm from '../components/savings/NewSavingForm';
import TagsList from '../components/tags/TagsList';

const HomePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }
    
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        
                <section className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                    <div className="self-end p-4">
                        <button className="mb-2 md:mb-0 flex-no-shrink bg-green-400 hover:bg-green-500 px-5 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300" onClick={openModalHandler}>
                            + New Saving
                        </button>
                    </div>
                    {modalIsOpen && <Modal title={"New Saving"} onCancel={closeModalHandler} onConfirm={closeModalHandler}>
                                        <NewSavingForm  className={classes.form} onSubmitSuccess={closeModalHandler} />
                                    </Modal>}
                    {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                    <SavingsList view={"simple"}/>
                </section>
            
                <section className="flex flex-col p-4 relative items-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                    <TagsList className={classes.card} view={"simple"} />
                </section>

        </div>
    );
}

export default HomePage;
