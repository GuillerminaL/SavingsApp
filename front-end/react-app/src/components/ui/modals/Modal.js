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
        <div className="flex flex-col p-4 z-5001 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
            <div className="">
                <div className="text-center p-5 flex-auto justify-center">
                    {/* Some Image */}
                    <h2 className="text-xl font-bold py-4 text-gray-200">{title}</h2>
                    { description && <p className="text-sm text-gray-500 px-8">{description}</p> }
                </div>
                { children && {children}}
                
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                    <button onClick={onCancel}
                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300">{action}</button>
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