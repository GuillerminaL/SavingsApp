import { useState, useEffect } from 'react';

import { API_HOST } from '../../config/index';
import classes from './css/MovementsListModal.module.css';
import MovementsList from './MovementsList.js';
import LoadingSpinner from '../spinner/LoadingSpinner.js';

function MovementsListModal(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovements, setLoadedMovements] = useState([]);

    function cancelHandler() {
        props.onCancel();
    }

    async function fetchData() {
        try {
            const response = await fetch(`${API_HOST}/movements?savingId=${props.saving.id}`);
            const data = await response.json();
            const movements = []; 
            for (const key in data.movements) {
                const movement = {
                    id: data.movements[key]._id,
                    savingId: data.movements[key].savingId,
                    currencyId: data.movements[key].currencyId,
                    concept: data.movements[key].concept,
                    amount: data.movements[key].amount,
                    createdAt: data.movements[key].createdAt.split("T", 1)
                };
                movements.push(movement);
            }
            setIsLoading(false); 
            setLoadedMovements(movements);
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
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h1>Movements</h1>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <div className={classes.control}>
                <h3>Saving: {props.saving.tagName}</h3>
                <h3>Current currency: {props.saving.currencyName}</h3>
            </div>
            <div className={classes.grid}>
                <MovementsList movements={loadedMovements}></MovementsList>
            </div>
        </div>
    );
}

export default MovementsListModal;