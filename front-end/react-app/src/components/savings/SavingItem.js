import { useState } from 'react';

import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import ListIcon from '../icons/List';
import MovementsList from '../movements/MovementsList';
import NewMovementHandler from '../movements/NewMovementHandler';
import CurrencyIcon from '../icons/currencies/CurrencyIcon';

const SavingItem = (props) => {
    const [amountIsVisible, setAmountVisibility] = useState(false);
    const [showMovements, setShowMovements] = useState(false);

    return (
        <li className="flex flex-col p-4 m-2 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-col ml-3">
                    <h1 className="font-medium leading-none text-gray-100">{props.tagName}</h1>
                    { (props.view !== "simple") && 
                        <p className="text-sm text-gray-500 leading-none mt-1">{props.tagDescription}</p> 
                    }
                </div>
                <div className="flex py-2 bg-gray-600 rounded-lg min-w-20">
                    <div className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center text-gray-900 bg-gray-300  hover:bg-gray-400 hover:text-grey-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <CurrencyIcon currencyCode={props.currencyCode} />
                        <p className="text-xl font-semibold px-2 text-gray-300">{props.currencyCode}</p> 
                    </div>
                    <div className="relative w-full">
                        <p className="block h-full min-w-20 p-2.5 z-20 text-xl font-semibold px-2 text-gray-300 bg-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"> {amountIsVisible ? props.amount : '**********'}</p>
                    </div>
                    <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}
                        className='group btn-primary'>
                        { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                    </button>
                </div>
            </div>
            <div className="flex justify-center flex-no-wrap pt-4 font-medium leading-none text-gray-500">
                <div>
                    <button className='group btn-primary' onClick={() => {setShowMovements(!showMovements);}}>
                        <ListIcon width={'25px'} height={'25px'} />
                        <span className="text-m leading-none p-1" >{ showMovements ? "Hide movements" : "Show Movements"}</span>
                    </button>
                </div>
                <div>
                    <NewMovementHandler tagName={props.tagName} savingId={props.id} currencyCode={props.currencyCode} />
                </div>
            </div>
            { showMovements && <MovementsList savingId={props.id} onClick={() => {setShowMovements(false);} } />} 
        </li>
    );
}

export default SavingItem;