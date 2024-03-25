import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { postData } from '../../data/data';
import classes from './css/NewTagForm.module.css';

const NewTagForm = () => {
    const navigate = useNavigate();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const tagData = {
            name: enteredName,
            description: enteredDescription
        };
        const response = await postData('tags', tagData);
        if ( response.status === 201 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input type='text' required id='name' ref={nameInputRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='description'>Description</label>
                <input type='text' required id='description' ref={descriptionInputRef}></input>
            </div>
            <div className={classes.actions}>
                <button>Add New Tag</button>
            </div>
        </form>
    );
}

export default NewTagForm;