import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchData, postData } from '../../data/data';
import classes from './css/NewSavingForm.module.css';
import LoadingSpinner from '../spinner/LoadingSpinner';

const NewSavingForm = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);
    const [loadedTags, setLoadedTags] = useState([]); 

    const currencyIdInputRef = useRef();
    const tagIdInputRef = useRef();

    async function getCurrenciesData() {
        const data = await fetchData('currencies');
        const currencies = [];
        for (const key in data.currencies) {
            const currency = {
                key: data.currencies[key]._id,
                id: data.currencies[key]._id,
                name: data.currencies[key].name
            };
            currencies.push(currency);
        }
        setLoadedCurrencies(currencies);
    }

    async function getTagsData() {
        const data = await fetchData('tags');
        const tags = [];
        for (const key in data.tags) {
            const tag = {
                key: data.tags[key]._id,
                id: data.tags[key]._id,
                name: data.tags[key].name
            }
            tags.push(tag);
        }
        setLoadedTags(tags);
        setIsLoading(false);
    }

    async function submitHandler(event) {
        event.preventDefault();
        const enteredCurrencyId = currencyIdInputRef.current.value;
        const enteredTagId = tagIdInputRef.current.value;
        const savingData = {
            currencyId: enteredCurrencyId,
            tagId: enteredTagId
        };
        const response = await postData('savings', savingData);
        if ( response.status === 201 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
            props.onSubmitSuccess();
        }   
    }

    useEffect(() => {
        getCurrenciesData();
        getTagsData();
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <div>
                    <label>Currency:</label>
                    <select>
                        {loadedCurrencies.map(({ id, name }) => 
                        <option required value={id} id='currencyId' ref={currencyIdInputRef}>{name}</option>)}
                    </select>    
                </div>
            </div>
            <div className={classes.control}>
                <div>
                <label>Tag:</label>
                    <select>
                        {loadedTags.map(({ id, name }) => 
                        <option required value={id} id='tagId' ref={tagIdInputRef}>{name}</option>)}
                    </select>    
                </div>
            </div>
            <div className={classes.actions}>
                <button>Add Saving</button>
            </div>
        </form>
    );
}

export default NewSavingForm;