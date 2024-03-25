import { useState } from 'react';

import classes from './css/HomePage.module.css';
import Backdrop from '../components/ui/Backdrop';
import Modal from '../components/ui/modals/Modal';
import TagsList from '../components/tags/TagsList';
import NewTagForm from '../components/tags/NewTagForm';

const TagsPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
        <section>
            <h1>My Tags...</h1>
            <div className={classes.grid}>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Tag
                    </button>
                </div>
                {modalIsOpen && <Modal title={"New Tag"} onCancel={closeModalHandler} onConfirm={closeModalHandler}>
                                    <NewTagForm className={classes.form} onSubmitSuccess={closeModalHandler}/>
                                </Modal>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <TagsList className={classes.card} />
            </div>
        </section>
    );
}

export default TagsPage;
