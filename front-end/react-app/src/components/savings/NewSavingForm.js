import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './css/NewSavingForm.module.css';

function NewSavingForm(props) {
    const titleInputRef = useRef();
    const descInputRef = useRef();
    const amountInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDesc = descInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;

        const savingData = {
            title: enteredTitle,
            description: enteredDesc,
            amount: enteredAmount
        };

        props.onAddSaving(savingData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' required id='title' ref={titleInputRef}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description </label>
                    <textarea id='description' required rows='5' ref={descInputRef}></textarea>
                </div>
                <div className={classes.control}>
                    <label htmlFor='amount'>Amount</label>
                    <input type='text' required id='amount' ref={amountInputRef}></input>
                </div>
                <div className={classes.actions}>
                    <button>Add Saving</button>
                </div>
            </form>
        </Card>
    );
}

export default NewSavingForm;