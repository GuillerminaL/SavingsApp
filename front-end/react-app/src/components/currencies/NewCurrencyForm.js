import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { postData } from '../../data/data';
import classes from './css/NewCurrencyForm.module.css';

const NewCurrencyForm = (props) => {
    const navigate = useNavigate();
    const imageInputRef = useRef();
    const currencyNameInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredImage = imageInputRef.current.value;
        const enteredCurrencyName = currencyNameInputRef.current.value;
        const currencyData = {
            name: enteredCurrencyName,
            imageUrl: enteredImage
        };
        const response = await postData('currencies', currencyData);
        if ( response.status === 201 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
            props.onSubmitSuccess();
        }        
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