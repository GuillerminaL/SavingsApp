import { useState, useEffect } from 'react';

import { fetchData } from '../../data/data';
import classes from './css/CurrenciesList.module.css';
import CurrencyItem from './CurrencyItem';
import LoadingSpinner from '../spinner/LoadingSpinner';

const CurrenciesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);

    async function getData() {
        const data = await fetchData('currencies');
        const currencies = [];
        for (const key in data.currencies) {
            const currency = {
                key: data.currencies[key]._id,
                id: data.currencies[key]._id,
                name: data.currencies[key].name,
                image: data.currencies[key].imageUrl
            };
            currencies.push(currency);
        }
        setLoadedCurrencies(currencies);
        setIsLoading(false);
    }

    useEffect(() => {
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
        <ul className={classes.list}>
            {loadedCurrencies.map((currency) => (
                <CurrencyItem
                  key={currency.id}
                  id={currency.id}
                  image={currency.image}
                  name={currency.name}
                />
            ))}
        </ul>
    );
}

export default CurrenciesList;