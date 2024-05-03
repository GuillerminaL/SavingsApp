const ModalActions = ({ onCancelHandler, onConfirmHandler, btnText }) => {
    return(
        <div className="flex justify-center gap-4">
            <button onClick={onCancelHandler}
                    className="btn-cancel">
                <span className="p-1 text-sm leading-none">Cancel</span>
            </button>
            <button onClick={onConfirmHandler}
                    className="btn-confirm">
                <span className="p-1 text-sm leading-none">{btnText ? btnText : "Add"}</span>
            </button>
        </div>
    );
}

export default ModalActions;