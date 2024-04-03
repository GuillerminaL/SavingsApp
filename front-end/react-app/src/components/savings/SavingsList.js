import { useState, useEffect } from 'react';

import { fetchData } from '../../data/data';
import LoadingSpinner from '../spinner/LoadingSpinner';
import SavingItem from './SavingItem';

const SavingsList = ({ view }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSavings, setLoadedSavings] = useState([]);

    async function getData() {
        const data = await fetchData('savings'); 
        const savings = [];
        for (const key in data.savings) {
            const saving = {
                id: data.savings[key]._id,
                tagId: data.savings[key].tag._id,
                tagName: data.savings[key].tag.name,
                tagDescription: data.savings[key].tag.description,
                currencyId: data.savings[key].currency._id,
                currencyCode: data.savings[key].currency.code,
                currencyName: data.savings[key].currency.name,
                currencyImage: data.savings[key].currency.imageUrl,
                amount: data.savings[key].amount
            };
            savings.push(saving);
        }
        setLoadedSavings(savings);
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
        <ul className="w-full p-4 justify-center list-none">
            {loadedSavings.map((saving) => (
                <SavingItem view={view}
                  key={saving.id}
                  id={saving.id}
                  currencyId={saving.currencyId}
                  currencyCode={saving.currencyCode}
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