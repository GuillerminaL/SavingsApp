import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Label, TextInput } from "flowbite-react";

import { postData } from '../../data/data';
import PlusIcon from '../icons/Plus';
import ModalActions from '../ui/modals/ModalActions';
import CurrencyIcon from '../icons/currencies/CurrencyIcon';

const NewMovementForm = ({ tagName, savingId, currencyCode }) => {
    const navigate = useNavigate();
    const conceptInputRef = useRef();
    const amountInputRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [isValid, setIsValid] = useState(true);

    function onCancelHandler() {
        setOpenModal(false);
    }

    async function onConfirmHandler(event) {
        event.preventDefault();
        let enteredConcept = conceptInputRef.current.value;
        const enteredAmount = Number(amountInputRef.current.value);
        if ( enteredAmount === 0 ) {
            console.log("invalid data");
            setIsValid(false);
            setTimeout(() => {
                setIsValid(true);
            }, 800);
            return;
        } 
        if ( enteredConcept === "") {
            enteredConcept = (enteredAmount > 0) ? "New saving" : "New sustraction";
        } 
        const movementData = {
            savingId: savingId,
            concept: enteredConcept,
            amount: enteredAmount
        };
        setOpenModal(false);
        const response = await postData('movements', movementData);
        alert(response.message);
        navigate(0);
    }

    return (
        <>
            <div>
                <button className='btn-primary group' onClick={() => setOpenModal(true)}>
                    <PlusIcon width={'25px'} height={'25px'} />
                    <span className="p-1 text-sm leading-none">New Movement</span>
                </button>
            </div>
            
            <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="py-2 text-xl font-bold text-gray-500">New movement to...</h3>
                        <p className="py-2 text-xl font-semibold text-gray-400">{tagName}</p>
                        <div>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="concept" value="Concept" className="py-2 text-xl text-gray-500"/>
                                </div>
                                <TextInput
                                    id="concept"
                                    placeholder=""
                                    ref={conceptInputRef}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="">
                                <Label htmlFor="amount" value="Amount " className="py-2 text-xl text-gray-500" />
                                    <span className={ !isValid ? "text-red-500" : ""} >*</span>
                            </div>
                            <div className="flex py-2">
                                <div className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <CurrencyIcon currencyCode={currencyCode} />
                                    <p className="px-2 text-xl font-semibold text-gray-400">{currencyCode}</p> 
                                </div>
                                <div className="relative w-full">
                                    <input type='number' id='amount' ref={amountInputRef} required className={ !isValid ? "z-20 block size-full rounded-e-lg border border-s-2 border-red-300 border-s-red-100 bg-red-100 p-2.5 text-sm text-gray-900" : "z-20 block size-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700  dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"} placeholder="Enter movement amount..."/>
                                </div>
                            </div>
                        </div> 
                        <span className={ isValid ? "py-2 text-xs text-gray-500" : "py-2 text-xs text-red-500" } >* required </span>
                        <ModalActions onCancelHandler={onCancelHandler} onConfirmHandler={onConfirmHandler} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewMovementForm;