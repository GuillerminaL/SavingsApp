import { useState, useEffect } from 'react';
import SavingsList from '../components/savings/SavingsList';

function AllSavingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSavings, setLoadedSavings] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://savings-app-b2edb-default-rtdb.firebaseio.com/savings.json')
            .then((response) => { 
                return response.json(); 
            })
            .then((data) => { 
                const savings = []; 

                for (const key in data) {
                    const saving = {
                        id: key,
                        ...data[key]
                    };
                    savings.push(saving);
                }

                setIsLoading(false); 
                setLoadedSavings(savings);
            });
    }, []);

    

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <div>
            <h1>Savings</h1>
            <SavingsList savings={loadedSavings}></SavingsList>
        </div>
    );
}

export default AllSavingsPage;