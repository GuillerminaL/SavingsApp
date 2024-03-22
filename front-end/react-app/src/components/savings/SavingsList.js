import { useState, useEffect } from 'react';

import { fetchSavings } from '../../data/data';
import classes from './css/SavingsList.module.css';
import LoadingSpinner from '../spinner/LoadingSpinner';
import SavingItem from './SavingItem';

const SavingsList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSavings, setLoadedSavings] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const savings = await fetchSavings(); 
            setLoadedSavings(savings);
            setIsLoading(false);
        }
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
        {loadedSavings.map((saving) => (
          <SavingItem
            key={saving.id}
            id={saving.id}
            currencyId={saving.currencyId}
            currencyName={saving.currencyName}
            currencyImage={saving.currencyImage}
            tagId={saving.tagId}
            tagName={saving.tagName}
            tagDescription={saving.tagDescription}
            amount={saving.amount}
          />
        ))}
      </ul>
    );
}

export default SavingsList;