import { useRef, useState, useEffect } from 'react';

import { fetchCurrencies, fetchTags } from '../../data/data';
import { addSaving } from '../../data/data';
import Card from '../ui/Card';
import classes from './css/NewSavingForm.module.css';
import LoadingSpinner from '../spinner/LoadingSpinner';


const NewSavingForm = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);
    const [loadedTags, setLoadedTags] = useState([]); 

    const currencyIdInputRef = useRef();
    const tagIdInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();
        const enteredCurrencyId = currencyIdInputRef.current.value;
        const enteredTagId = tagIdInputRef.current.value;
        const savingData = {
            currencyId: enteredCurrencyId,
            tagId: enteredTagId
        };

        const response = await addSaving(savingData);
        alert(response.status, response.message);
        props.onSubmitSuccess();
    }

    useEffect(() => {
        const getData = async () => {
            const currencies = await fetchCurrencies();
            const tags = await fetchTags();
            setLoadedCurrencies(currencies);
            setLoadedTags(tags);
            setIsLoading(false);
        };
        getData();
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <div>
                        <label>Currency:</label>
                        <select>
                            {loadedCurrencies.map(({ id, name }) => 
                            <option value={id} id={id} ref={currencyIdInputRef}>{name}</option>)}
                        </select>    
                    </div>
                </div>
                <div className={classes.control}>
                    <div>
                    <label>Tag:</label>
                        <select>
                            {loadedTags.map(({ id, name }) => 
                            <option value={id} id={id} ref={tagIdInputRef}>{name}</option>)}
                        </select>    
                    </div>
                </div>
                <div className={classes.actions}>
                    <button>Add Saving</button>
                </div>
            </form>
        </Card>
    );
}

export default NewSavingForm;