import { useState } from 'react';

import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import ListIcon from '../icons/List';
import MovementsList from '../movements/MovementsList';
import NewMovementHandler from '../movements/NewMovementHandler';
import CurrencyIcon from '../icons/currencies/CurrencyIcon';
import CurrencyConverterHandler from './CurrencyConvertHandler';

const SavingItem = (props) => {
    const [amountIsVisible, setAmountVisibility] = useState(false);
    const [showMovements, setShowMovements] = useState(false);
    const [showConverter, setShowConverter] = useState(false);

    return (
        <li className="hover:shodow-lg m-2 flex cursor-pointer flex-col rounded-2xl border-gray-600 bg-gray-700 p-4 shadow-md transition duration-500 ease-in  hover:scale-105">
            <div className="flex flex-wrap items-center justify-between">
                <div className="ml-3 flex flex-col">
                    <h1 className="py-2 text-lg font-semibold leading-none text-gray-300">{props.tagName}</h1>
                    { (props.view !== "simple") && 
                        <p className="mt-1 text-sm leading-none text-gray-500">{props.tagDescription}</p> 
                    }
                </div>
                <div className="my-2 flex justify-evenly rounded-lg bg-gray-600">
                    <div onClick={() => {setShowConverter( ! showConverter )}} className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-600 bg-gray-600 text-center text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <CurrencyIcon currencyCode={props.currencyCode} />
                        <p className="px-2 text-lg font-semibold text-gray-300 hover:text-gray-600">{props.currencyCode}</p> 
                    </div>
                    <div className="relative w-full text-center">
                        <p className="z-20 block h-full min-w-28 bg-gray-600 p-2.5 px-2 text-xl  font-semibold text-gray-300" > {amountIsVisible ? props.amount : '**********'}</p>
                    </div>
                    <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}
                        className='btn-primary group mr-0 rounded-l-none'>
                        { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                    </button>
                </div>
                { showConverter && <CurrencyConverterHandler /> }
            </div>
            <div className="flex-no-wrap flex justify-center pt-4 font-medium leading-none text-gray-500">
                <div>
                    <button className='btn-primary group' onClick={() => {setShowMovements(!showMovements);}}>
                        <ListIcon width={'25px'} height={'25px'} />
                        <span className="text-m p-1 leading-none" >{ showMovements ? "Hide movements" : "Show Movements"}</span>
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