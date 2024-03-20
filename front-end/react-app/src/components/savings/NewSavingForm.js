import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './css/NewSavingForm.module.css';

function NewSavingForm(props) {
    const currencyIdInputRef = useRef();
    const tagIdInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredCurrencyId = currencyIdInputRef.current.value;
        const enteredTagId = tagIdInputRef.current.value;
        const savingData = {
            currencyId: enteredCurrencyId,
            tagId: enteredTagId
        };

        props.onAddSaving(savingData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    {/* Should iterate existing currencies or create a new one... */}
                    <h1>Currency</h1>
                    <label htmlFor="reais">Reais</label>
                    <input type="radio" defaultChecked id="reaisId" name="currency" value="HTML" ref={currencyIdInputRef}></input>
                    <label htmlFor="euro">Euro</label>
                    <input type="radio" id="euroId" name="currency" value="CSS" ref={currencyIdInputRef}></input>
                    <label htmlFor="dollar">Dollar</label>
                    <input type="radio" id="jdollarId" name="currency" value="JavaScript" ref={currencyIdInputRef}></input>
                </div>
                <div className={classes.control}>
                    {/* Should iterate existing Tags or create a new one... */}
                    <label htmlFor='description'>Tag</label>
                    <textarea id='description' required rows='5' ref={tagIdInputRef}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Add Saving</button>
                </div>
            </form>
        </Card>
    );
}

export default NewSavingForm;