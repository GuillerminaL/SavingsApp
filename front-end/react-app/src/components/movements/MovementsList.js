import { useState, useEffect } from 'react';
import { List } from 'flowbite-react';

import { fetchMovementsData } from '../../data/data';
import MovementItem from './MovementItem';
import LoadingSpinner from '../spinner/LoadingSpinner';

const MovementsList = ({ savingId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovements, setLoadedMovements] = useState([]);

    async function getData() {
        const data = await fetchMovementsData(savingId);
        const movements = []; 
        for (const key in data.movements) {
            const movement = {
                id: data.movements[key]._id,
                savingId: data.movements[key].savingId,
                currencyId: data.movements[key].currencyId,
                concept: data.movements[key].concept,
                amount: data.movements[key].amount,
                createdAt: data.movements[key].createdAt.split("T", 1)
            };
            movements.push(movement);
        }
        setLoadedMovements(movements);
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
        <List className="text-sm leading-none p-1">
            {loadedMovements.map((movement) => (
                <MovementItem
                  key={movement.id}
                  id={movement.id}
                  savingId={movement.savingId}
                  currencyId={movement.currencyId}
                  concept={movement.concept}
                  amount={movement.amount}
                  createdAt={movement.createdAt}
                />
            ))}
        </List>
    );
}

export default MovementsList;