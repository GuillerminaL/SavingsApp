import { useState, useEffect } from 'react';

import { API_HOST } from '../config/index';
import classes from './css/HomePage.module.css';
import Backdrop from '../components/Backdrop';
import LoadingSpinner from '../components/spinner/LoadingSpinner';

import SavingsList from '../components/savings/SavingsList';
import NewSavingModal from '../components/savings/NewSavingModal';


function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSavings, setLoadedSavings] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    async function fetchData() {
        try {
            const response = await fetch(`${API_HOST}/savings`);
            const data = await response.json();
            const savings = []; 
            for (const key in data.savings) {
                const saving = {
                    id: data.savings[key]._id,
                    tagId: data.savings[key].tag._id,
                    tagName: data.savings[key].tag.name,
                    tagDescription: data.savings[key].tag.description,
                    currencyId: data.savings[key].currency._id,
                    currencyName: data.savings[key].currency.name,
                    currencyImage: data.savings[key].currency.imageUrl,
                    amount: data.savings[key].amount
                };
                savings.push(saving);
            }
            setIsLoading(false); 
            setLoadedSavings(savings);
            console.log(savings);
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
            <h1>My Savings...</h1>
            <div className={classes.grid}>
                <div className={classes.actions}>
                    <button onClick={openModalHandler}>
                        + New Saving
                    </button>
                </div>
                {modalIsOpen && <NewSavingModal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
                {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
                <SavingsList className={classes.card} savings={loadedSavings}></SavingsList>
            </div>
        </section>
    );
}

export default HomePage;
