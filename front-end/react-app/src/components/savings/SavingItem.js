import { useState } from 'react';

import PlusIcon from '../icons/Plus';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import ListIcon from '../icons/List';
import MovementsList from '../movements/MovementsList';
import NewMovementForm from '../movements/NewMovementForm';


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
                <div className="flex items-center justify-between p-2">
                    <p className="font-medium leading-none text-gray-300">{props.currencyCode}</p>
                    <p className="font-medium leading-none text-gray-300">$ {amountIsVisible ? props.amount : '**********'}</p>
                    <button onClick={() => {setAmountVisibility( ! amountIsVisible );}}
                        className='group btn-primary'>
                        { amountIsVisible ? <EyeOffIcon /> : <EyeOnIcon /> }
                    </button>
                </div>
            </div>
            <div className="flex justify-center flex-no-wrap pt-4 font-medium leading-none text-gray-500">
                <div >
                    <button className='group btn-primary' onClick={() => {setShowMovements(!showMovements);}}>
                        <ListIcon width={'25px'} height={'25px'} />
                        <span className={showMovements ? "text-sm leading-none p-1 text-green-400": "text-m leading-none p-1"} >{ showMovements ? "Hide movements" : "Show Movements"}</span>
                    </button>
                </div>
                <div>
                    <button className='group btn-primary' onClick={() => {console.log("Add movements");}}>
                        <PlusIcon width={'25px'} height={'25px'} />
                        <span className="text-sm leading-none p-1">Add Movement</span>
                    </button>
                </div>
            </div>
            { showMovements && <MovementsList savingId={props.id} onClick={() => {setShowMovements(false);} } />}  
        </li>
    );
}

export default SavingItem;