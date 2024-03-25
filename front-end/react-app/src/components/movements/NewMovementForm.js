import { useRef } from 'react';

import { postData } from '../../data/data';
import classes from './css/NewMovementForm.module.css';

const NewMovementForm = (props) => {
    const conceptInputRef = useRef();
    const amountInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredConcept = conceptInputRef.current.value;
        const enteredAmount = Number(amountInputRef.current.value);
        const movementData = {
            concept: enteredConcept,
            amount: enteredAmount
        };
        const response = await postData('movements', movementData);
        alert(response.status, response.message);
        props.onSubmitSuccess();
    }

    return (
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='concept'>Concept</label>
                    <input type='text' required id='concept' ref={conceptInputRef}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='amount'>Amount</label>
                    <input type='number' required id='amount' ref={amountInputRef}></input>
                </div>
                <div className={classes.actions}>
                    <button>Add Movement</button>
                </div>
            </form>
    );
}

export default NewMovementForm;