import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Label, TextInput } from "flowbite-react";

import { patchData } from '../../data/data';
import EditIcon from '../icons/Pen';
import ModalActions from "../ui/modals/ModalActions";

const EditTagHandler = ({ width, height, id, currentName, currentDescription }) => { 
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
        const enteredDescription = (descriptionInputRef.current.value && descriptionInputRef.current.value !== currentDescription) ? descriptionInputRef.current.value : null;
        const enteredData = {
            name: "",
            description: ""
        };
        if ( enteredName && enteredName !== currentName ) {
            enteredData.name = enteredName;
        }
        if ( enteredDescription && enteredDescription !== currentDescription ) {
            enteredData.description = enteredDescription;
        } 
        if ( enteredData.name === "" && enteredData.description === "" ) {
            console.log("invalid data");
            setIsValid(false);
            setTimeout(() => {
                setIsValid(true);
            }, 800);
            return;
        }         
        setOpenModal(false);
        const response = await patchData('tags', id, enteredData);  
        alert(response.message);
        navigate(0);
    }
   
    return (
        <>
            <button onClick={() => setOpenModal(true)} className='group btn-primary'> 
                    <div className='flex flex-col items-center'>
                        <EditIcon width={width} height={height} />
                        <span className="text-sm leading-none p-1">Edit</span>
                    </div>
            </button>
            <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold py-2 text-gray-500">Edit tag...</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Tag name" color={ isValid ? "" : "failure" } className="text-sm text-gray-400 py-2"/>
                            </div>
                            <TextInput
                                id="name"
                                placeholder={currentName}
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
                                placeholder={currentDescription}
                                ref={descriptionInputRef}
                                required
                                color={ isValid ? "" : "failure" }
                            />
                        </div>
                        <ModalActions onCancelHandler={onCancelHandler} onConfirmHandler={onConfirmHandler} btnText={"Edit"}/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditTagHandler;