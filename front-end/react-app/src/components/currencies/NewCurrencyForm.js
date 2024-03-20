import { useRef } from 'react';

import classes from './css/NewCurrencyForm.module.css';

function NewCurrencyForm(props) {
    const imageInputRef = useRef();
    const currencyNameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredImage = imageInputRef.current.value;
        const enteredCurrencyName = currencyNameInputRef.current.value;

        const currencyData = {
            name: enteredCurrencyName,
            imageUrl: enteredImage
        };

        props.onAddCurrency(currencyData);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='currencyName'>Name</label>
                <input type='text' required id='currencyName' ref={currencyNameInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='image'>Image</label>
                <input type='url' required id='image' ref={imageInputRef}></input>
            </div>
            <div className={classes.actions}>
                <button>Add New Currency</button>
            </div>
        </form>
    );
}

export default NewCurrencyForm;