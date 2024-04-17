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
            <List className="text-sm leading-none p-1">
                { failedConnection && 
                    <List.Item onClick={onClick} className='flex flex-col text-center text-sm text-gray-400 font-normal leading-none mt-1 p-1 bg-gray-600 rounded-md' >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 m-2 flex items-center text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-sm font-bold py-2 text-gray-200">Ups! Something went wrong...</h2>
                        <p className="text-xs text-gray-400 px-8 py-2">We are working hard to solve it!</p>
                    </List.Item>
                }
                { ( !failedConnection && loadedMovements && loadedMovements.length === 0) && 
                    <List.Item className='flex flex-col text-center text-sm text-gray-400 font-normal leading-none mt-1 p-1 bg-gray-600 rounded-md' >
                        <h2 className="text-sm font-bold py-4 text-gray-200">This saving has no movements yet</h2>
                        <p className="text-xs text-gray-500 px-8">Try adding some!</p>
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