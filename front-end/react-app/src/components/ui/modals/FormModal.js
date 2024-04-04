const FormModal = ({children, onCancelHandler, }) => {
    return(
        <Modal dismissible show={openModal} size="md" onClose={onCancelHandler} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-bold py-2 text-gray-500">Add a new saving...</h3>
                <div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="currency" value="Select a currency" color={ isValid ? "" : "failure" } className="text-sm text-gray-400 py-2"/>
                        </div>
                        <Select>
                            {loadedCurrencies.map(({ id, name }) => 
                            <option required value={id} id='currencyId' ref={currencyIdInputRef}>{name}</option>)}
                        </Select>
                    </div>
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="tag" value="Select a tag" color={ isValid ? "" : "failure" } className="text-sm text-gray-400 py-2"/>
                        </div>
                        <Select>
                            {loadedTags.map(({ id, name }) => 
                            <option required value={id} id='tagId' ref={tagIdInputRef}>{name}</option>)}
                        </Select>
                    </div>
                </div> 
                <div className="flex justify-center gap-4">
                    <button onClick={onCancelHandler}
                            className="btn-cancel">
                        <span className="text-sm leading-none p-1">Cancel</span>
                    </button>
                    <button onClick={onConfirmHandler}
                            className="btn-confirm">
                        <span className="text-sm leading-none p-1">Add Saving</span>
                    </button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    );
}

export default FormModal;