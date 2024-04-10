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
        <li className="flex flex-col p-4 m-2 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-col ml-3">
                    <h1 className="font-semibold text-lg leading-none text-gray-300 py-2">{props.tagName}</h1>
                    { (props.view !== "simple") && 
                        <p className="text-sm text-gray-500 leading-none mt-1">{props.tagDescription}</p> 
                    }
                </div>
                <div className="flex my-2 bg-gray-600 rounded-lg justify-evenly">
                    <div onClick={() => {setShowConverter( ! showConverter )}} className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center bg-gray-600 border border-gray-600 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                        <CurrencyIcon currencyCode={props.currencyCode} />
                        <p className="text-lg font-semibold px-2 text-gray-300 hover:text-gray-600">{props.currencyCode}</p> 
                    </div>
                    <div className="relative w-full text-center">
                        <p className="block h-full min-w-28 p-2.5 z-20 text-xl font-semibold text-gray-300  px-2 bg-gray-600" > {amountIsVisible ? props.amount : '**********'}</p>
                    </div>
                    <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}
                        className='group btn-primary mr-0 rounded-l-none'>
                        { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                    </button>
                </div>
                { showConverter && <CurrencyConverterHandler /> }
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