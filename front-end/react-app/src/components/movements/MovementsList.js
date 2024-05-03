import { useState, useEffect } from 'react';
import { List } from 'flowbite-react';

import { fetchMovementsData } from '../../data/data';
import MovementItem from './MovementItem';
import LoadingSpinner from '../spinner/LoadingSpinner';
import PaginationHandler from './PaginationHandler';

let movements_filters = {active: true, page: 1, limit: 5, savingId: null, currencyId: null};

const MovementsList = ({ savingId, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [failedConnection, setFailedConection] = useState(false);
    const [loadedMovements, setLoadedMovements] = useState([]);

    async function getData() {
        movements_filters.savingId = savingId;
        const data = await fetchMovementsData(movements_filters);
        if ( ! data ) { 
            setFailedConection(true); 
            setIsLoading(false);
            return;
        }
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
        <section>
            <List className="p-1 text-sm leading-none">
                { failedConnection && 
                    <List.Item onClick={onClick} className='mt-1 flex flex-col rounded-md bg-gray-600 p-1 text-center text-sm font-normal leading-none text-gray-400' >
                        <svg xmlns="http://www.w3.org/2000/svg" className="m-2 mx-auto flex size-6 items-center text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="py-2 text-sm font-bold text-gray-200">Ups! Something went wrong...</h2>
                        <p className="px-8 py-2 text-xs text-gray-400">We are working hard to solve it!</p>
                    </List.Item>
                }
                { ( !failedConnection && loadedMovements && loadedMovements.length === 0) && 
                    <List.Item className='mt-1 flex flex-col rounded-md bg-gray-600 p-1 text-center text-sm font-normal leading-none text-gray-400' >
                        <h2 className="py-4 text-sm font-bold text-gray-200">This saving has no movements yet</h2>
                        <p className="px-8 text-xs text-gray-500">Try adding some!</p>
                    </List.Item>
                }
                { !failedConnection && loadedMovements.length > 0 && loadedMovements.map((movement) => (
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
            {/* { !failedConnection && loadedMovements.length > 0 && <PaginationHandler /> } */}
        </section>
    );
}

export default MovementsList;