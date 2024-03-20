import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './css/NewMovementForm.module.css';

function NewMovementForm(props) {
    const conceptInputRef = useRef();
    const amountInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredConcept = conceptInputRef.current.value;
        const enteredAmount = Number(amountInputRef.current.value);

        const movementData = {
            concept: enteredConcept,
            amount: enteredAmount
        };

        props.onAddMovement(movementData);
    }

    return (
        <Card>
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
        </Card>
    );
}

export default NewMovementForm;