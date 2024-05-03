import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Label, Select} from "flowbite-react";

import { fetchData, postData } from '../../data/data';
import ModalActions from "../ui/modals/ModalActions";
import LoadingSpinner from '../spinner/LoadingSpinner';

const NewSavingHandler = () => { 
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCurrencies, setLoadedCurrencies] = useState([]);
    const [loadedTags, setLoadedTags] = useState([]); 
    const currencyIdInputRef = useRef();
    const tagIdInputRef = useRef();

    async function getCurrenciesData() {
        const data = await fetchData('currencies');
        const currencies = [];
        for (const key in data.currencies) {
            const currency = {
                key: data.currencies[key]._id,
                id: data.currencies[key]._id,
                name: data.currencies[key].name
            };
            currencies.push(currency);
        }
        setLoadedCurrencies(currencies);
    }

    async function getTagsData() {
        const data = await fetchData('tags');
        const tags = [];
        for (const key in data.tags) {
            const tag = {
                key: data.tags[key]._id,
                id: data.tags[key]._id,
                name: data.tags[key].name
            }
            tags.push(tag);
        }
        setLoadedTags(tags);
        setIsLoading(false);
    }

    function onCancelHandler() {
        setOpenModal(false);
    }

    async function onConfirmHandler(event) {
        event.preventDefault();
        const enteredCurrencyId = currencyIdInputRef.current.value;
        const enteredTagId = tagIdInputRef.current.value;
        const savingData = {
            currencyId: enteredCurrencyId,
            tagId: enteredTagId
        };
        setOpenModal(false);
        const response = await postData('savings', savingData);
        alert(response.message);
        navigate(0);
    }

    useEffect(() => {
        getCurrenciesData();
        getTagsData();
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }
   
    return (
        <>
            <div className="self-end p-4">
                <button onClick={() => setOpenModal(true)} className='btn-confirm'>
                    <span className="p-1 text-sm leading-none">+ New Saving</span>
                </button>
            </div>
            <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="py-2 text-xl font-bold text-gray-500">Add a new saving...</h3>
                        <div>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="currency" value="Select a currency" className="py-2 text-sm text-gray-400"/>
                                </div>
                                <Select ref={currencyIdInputRef}>
                                    {loadedCurrencies.map(({ id, name }) => 
                                    <option key={id} required value={id} id='currencyId' >{name}</option>)}
                                </Select>
                            </div>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="tag" value="Select a tag" className="py-2 text-sm text-gray-400"/>
                                </div>
                                <Select ref={tagIdInputRef}>
                                    {loadedTags.map(({ id, name }) => 
                                    <option key={id} required value={id} id='tagId'>{name}</option>)}
                                </Select>
                            </div>
                        </div> 
                        <ModalActions onCancelHandler={onCancelHandler} onConfirmHandler={onConfirmHandler} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewSavingHandler;