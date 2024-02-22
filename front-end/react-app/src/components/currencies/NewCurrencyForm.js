import { useRef } from 'react';

import classes from './css/NewCurrencyForm.module.css';

function NewCurrencyForm(props) {
    const imageInputRef = useRef();
    const currencyNameInputRef = useRef();
    const amountInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredImage = imageInputRef.current.value;
        const enteredCurrencyName = currencyNameInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;

        const currencyData = {
            image: enteredImage,
            currencyName: enteredCurrencyName,
            amount: enteredAmount
        };

        props.onAddCurrency(currencyData);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='image'>Image</label>
                <input type='url' required id='image' ref={imageInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='currencyName'>Currency</label>
                <input type='text' required id='currencyName' ref={currencyNameInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='amount'>Amount</label>
                <input type='text' required id='amount' ref={amountInputRef}></input>
            </div>
            <div className={classes.actions}>
                <button>Add New Currency Saving</button>
            </div>
        </form>
    );
}

export default NewCurrencyForm;