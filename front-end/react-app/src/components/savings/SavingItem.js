import { useState } from 'react';

import classes from './css/SavingItem.module.css';
import PlusIcon from '../icons/Plus';
import EyeOnIcon from '../icons/EyeOn';
import EyeOffIcon from '../icons/EyeOff';
import ListIcon from '../icons/List';
import Modal from '../ui/modals/Modal';
import Backdrop from '../ui/Backdrop';
import MovementsList from '../movements/MovementsList';
import NewMovementForm from '../movements/NewMovementForm';


const SavingItem = (props) => {
    const [amountIsVisible, setAmountVisibility] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movementsListModalIsOpen, setMovementsListModalIsOpen] = useState(false);

    return (
        <li className="flex flex-col p-4 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
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
                    <button className='group btn-primary' onClick={() => {setMovementsListModalIsOpen(true);}}>
                        <ListIcon width={'25px'} height={'25px'} />
                        <span className="text-sm leading-none p-1">Show Movements</span>
                    </button>
                </div>
                
                <div>
                    <button className='group btn-primary' onClick={() => {setModalIsOpen(true);}}>
                        <PlusIcon width={'25px'} height={'25px'} />
                        <span className="text-sm leading-none p-1">Add Movement</span>
                    </button>
                </div>
            </div>

            {movementsListModalIsOpen && <Modal title={"Movements Detail"} onCancel={() => {setMovementsListModalIsOpen(false);}} onConfirm={() => {setMovementsListModalIsOpen(false);}}>
                                            <div className={classes.control}>
                                                <h3>Saving: {props.tagName}</h3>
                                                <h3>Currency: {props.currencyName}</h3>
                                            </div>
                                            <MovementsList savingId={props.id} />
                                        </Modal>}
            {movementsListModalIsOpen && <Backdrop onClick={() => {setMovementsListModalIsOpen(false);}}/>}
            
            {modalIsOpen && <Modal title={"New Movement"} onCancel={() => {setModalIsOpen(false);}} onConfirm={() => {setModalIsOpen(false);}}>
                                <NewMovementForm className={classes.form} onSubmitSuccess={() => {setModalIsOpen(false);}} />
                            </Modal>}
            {modalIsOpen && <Backdrop onClick={() => {setModalIsOpen(false);}}/>}     
        </li>
    );
}

export default SavingItem;