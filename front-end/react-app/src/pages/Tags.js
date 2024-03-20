import { useState, useEffect } from 'react';

import { API_HOST } from '../config/index';
import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import TagsList from '../components/tags/TagsList';
import NewTagModal from '../components/tags/NewTagModal';


function TagsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTags, setLoadedTags] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    async function fetchData() {
        try {
            const response = await fetch(`${API_HOST}/tags`);
            const data = await response.json();
            const tags = []; 
            for (const key in data.tags) {
                const tag = {
                    id: data.tags[key]._id,
                    name: data.tags[key].name,
                    description: data.tags[key].description,
                };
                tags.push(tag);
            }
            setIsLoading(false); 
            setLoadedTags(tags);
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
