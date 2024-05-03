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
        <section className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-800 p-4  shadow-lg">
            { props.buttonText && 
                <div className="self-end p-4">
                <button className="flex-no-shrink mb-2 rounded-full border-2 border-green-300 bg-green-400 px-5 py-2 text-xs font-medium tracking-wider text-white shadow-sm transition duration-300 ease-in hover:border-green-500 hover:bg-green-500 hover:shadow-lg md:mb-0" onClick={openModalHandler}>
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