import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Label, TextInput } from "flowbite-react";

import { postData } from '../../data/data';
import ModalActions from "../ui/modals/ModalActions";

const NewTagHandler = () => { 
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();

    function onCancelHandler() {
        setIsValid(true);
        setOpenModal(false);
    }

    async function onConfirmHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredData = {
            name: enteredName,
            description: enteredDescription
        };

        if ( ! isValidData(enteredData) ) {
            console.log("invalid data");
            setIsValid(false);
            setTimeout(() => {
                setIsValid(true);
            }, 800);
            return;
        } 

        setOpenModal(false);
        const response = await postData('tags', enteredData);
        alert(response.message);
        navigate(0);
    }

    function isValidData({ name, description }) {
        if ( ! name || ! description ) {
            setIsValid(false);
            return false;
        } else {
            return true;
        }
    }
   
    return (
        <>
            <div className="self-end p-4">
                <button onClick={() => setOpenModal(true)} className='btn-confirm'>
                    <span className="p-1 text-sm leading-none">+ New Tag</span>
                </button>
            </div>
            <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6">
                    <h3 className="py-2 text-xl font-bold text-gray-500">Add a new tag...</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Tag name" color={ isValid ? "" : "failure" } className="py-2 text-sm text-gray-400"/>
                        </div>
                        <TextInput
                            id="name"
                            placeholder="Choose a unique name..."
                            ref={nameInputRef}
                            required
                            color={ isValid ? "" : "failure" }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Tag description" color={ isValid ? "" : "failure" } className="py-2 text-sm text-gray-400"/>
                        </div>
                        <TextInput
                            id="description"
                            placeholder="Type a brief description for this tag..."
                            ref={descriptionInputRef}
                            required
                            color={ isValid ? "" : "failure" }
                        />
                    </div>
                    <ModalActions onCancelHandler={onCancelHandler} onConfirmHandler={onConfirmHandler} />
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewTagHandler;