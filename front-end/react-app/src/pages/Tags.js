import { useState, useEffect } from 'react';

import { fetchTags } from '../data/data';
import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import TagsList from '../components/tags/TagsList';
import NewTagModal from '../components/tags/NewTagModal';

const TagsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTags, setLoadedTags] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    useEffect(() => {
        const getData = async () => {
            const tags = await fetchTags();
            setLoadedTags(tags);
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
            <h1>My Tags...</h1>
            <div className={classes.grid}>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Tag
                    </button>
                </div>
                {modalIsOpen && <NewTagModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <TagsList className={classes.card} tags={loadedTags}></TagsList>
            </div>
        </section>
    );
}

export default TagsPage;
