import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Label, TextInput } from "flowbite-react";

import { postData } from '../../data/data';

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

        console.log(enteredData);
        setOpenModal(false);
        return; 

        const response = await postData('tags', enteredData);
        
        if ( response.status === 201 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
        }
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
                    <span className="text-sm leading-none p-1">+ New Tag</span>
                </button>
            </div>
            <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-bold py-2 text-gray-500">Add a new tag...</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Tag name" color={ isValid ? "" : "failure" } className="text-sm text-gray-400 py-2"/>
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
                            <Label htmlFor="description" value="Tag description" color={ isValid ? "" : "failure" } className="text-sm text-gray-400 py-2"/>
                        </div>
                        <TextInput
                            id="description"
                            placeholder="Type a brief description for this tag..."
                            ref={descriptionInputRef}
                            required
                            color={ isValid ? "" : "failure" }
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={onCancelHandler}
                                className="btn-cancel">
                            <span className="text-sm leading-none p-1">Cancel</span>
                        </button>
                        <button onClick={onConfirmHandler}
                                className="btn-confirm">
                            <span className="text-sm leading-none p-1">Add Tag</span>
                        </button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewTagHandler;