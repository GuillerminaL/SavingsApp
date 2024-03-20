import { useRef } from 'react';

import classes from './css/NewTagForm.module.css';

function NewTagForm(props) {
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const tagData = {
            name: enteredName,
            description: enteredDescription
        };

        props.onAddTag(tagData);
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