import { useState } from 'react';

import Backdrop from '../ui/Backdrop';
import Modal from '../ui/modals/Modal';

const Section = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return(
        <section className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
            { props.buttonText && 
                <div className="self-end p-4">
                <button className="mb-2 md:mb-0 flex-no-shrink bg-green-400 hover:bg-green-500 px-5 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300" onClick={openModalHandler}>
                    {props.buttonText}
                </button>
            </div>
            }
            
            {modalIsOpen && <Modal title={props.modalTitle} onCancel={closeModalHandler} onConfirm={closeModalHandler}>
                                {props.form}
                            </Modal>}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
            {props.children}
        </section>
    );
}

export default Section;