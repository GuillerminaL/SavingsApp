import { useState } from 'react';

import Backdrop from "../Backdrop";

const VALID_ACTIONS = ['Edit', 'Delete', 'Confirm']

const Modal = ({ action, title, description, children, onConfirmAction, onCancelAction }) => {
    const [modalIsOpen, setModalIsOpen] = useState(true);

    function onCancel() {
        console.log("on cancel");
        setModalIsOpen(false);
        onCancelAction();
    }

    function onConfirm() {
        setModalIsOpen(false);
        onConfirmAction();
    }
    
    return (
        <>
        { !VALID_ACTIONS.includes(action) ? null :
        <div className="z-5001 relative flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-800 p-4  shadow-lg">
            <div className="">
                <div className="flex-auto justify-center p-5 text-center">
                    {/* Some Image */}
                    <h2 className="py-4 text-xl font-bold text-gray-200">{title}</h2>
                    { description && <p className="px-8 text-sm text-gray-500">{description}</p> }
                </div>
                { children && {children}}
                
                <div className="mt-2  space-x-4 p-3 text-center md:block">
                    <button onClick={onCancel}
                        className="mb-2 rounded-full border-2 border-gray-600 bg-gray-700 px-5 py-2 text-sm font-medium tracking-wider text-gray-300 shadow-sm transition duration-300 ease-in hover:border-gray-700 hover:bg-gray-800 hover:shadow-lg md:mb-0">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="ml-4 rounded-full border-2 border-green-300 bg-green-400 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm transition duration-300 ease-in hover:border-green-500 hover:bg-green-500 hover:shadow-lg">{action}</button>
                </div>             
            </div>
            {modalIsOpen && <Backdrop onClick={onCancel}/>}  
        </div>
        }
        </>
    );
}

export default Modal;

{/* <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>{title}</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            {children}
        </div> */}