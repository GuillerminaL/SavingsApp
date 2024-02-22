import { useState, useEffect } from 'react';

import CurrencyDetail from '../components/currencies/CurrencyDetail';
import LoadingSpinner from '../components/spinner/LoadingSpinner';

function CurrencyDetailPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrency, setLoadedCurrency] = useState({});

    useEffect(() => {
        setIsLoading(true);
        fetch('https://savings-app-b2edb-default-rtdb.firebaseio.com/currencies/-Np_TuHQWZGzBMiTzfSg.json')
            .then((response) => { 
                return response.json(); 
            })
            .then((data) => { 
                data.key = '-Np_TuHQWZGzBMiTzfSg';
                data.id = '-Np_TuHQWZGzBMiTzfSg';
               
                setIsLoading(false); 
                setLoadedCurrency(data);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return(
        <CurrencyDetail
          key={loadedCurrency.id}
          id={loadedCurrency.id}
          image={loadedCurrency.image}
          currencyName={loadedCurrency.currencyName}
          amount={loadedCurrency.amount}
        />
    );
}

export default CurrencyDetailPage;