const ModalActions = ({ onCancelHandler, onConfirmHandler }) => {
    return(
        <div className="flex justify-center gap-4">
            <button onClick={onCancelHandler}
                    className="btn-cancel">
                <span className="text-sm leading-none p-1">Cancel</span>
            </button>
            <button onClick={onConfirmHandler}
                    className="btn-confirm">
                <span className="text-sm leading-none p-1">Add</span>
            </button>
        </div>
    );
}

export default ModalActions;