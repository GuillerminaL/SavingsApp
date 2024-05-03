import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import TrashIcon from '../icons/Trash';

const DeleteButton = ({ width, height, onConfirm }) => { 

    const [openModal, setOpenModal] = useState(false);

    function onConfirmHandler() {
        setOpenModal(false);
        onConfirm();
    }
   
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='btn-primary group'> 
                    <div className='flex flex-col items-center'>
                        <TrashIcon width={width} height={height} />
                        <span className="p-1 text-sm leading-none">Remove</span>
                    </div>
            </button>
            <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center text-gray-500 dark:text-gray-400">
                    {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                    <div className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto flex size-4 items-center text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-13 h-13 mx-auto flex items-center text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="py-2 text-xl font-bold text-gray-500">Are you sure?</h2>
                        <p className="py-2 text-sm text-gray-400">Do you really want to delete this item? This process cannot be undone</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={onConfirmHandler}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            No, cancel
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteButton;