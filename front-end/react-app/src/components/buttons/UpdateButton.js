import { useState } from "react";
import { Button, Modal } from "flowbite-react";

import EditIcon from '../icons/Pen';

const UpdateButton = ({ width, height, onConfirm }) => { 

    const [openModal, setOpenModal] = useState(false);

    function onConfirmHandler() {
        setOpenModal(false);
        onConfirm();
    }
   
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='btn-primary group'> 
                    <div className='flex flex-col items-center'>
                        <EditIcon width={width} height={height} />
                        <span className="p-1 text-sm leading-none">Edit</span>
                    </div>
            </button>
            <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to edit this item?
                    </h3>
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

export default UpdateButton;