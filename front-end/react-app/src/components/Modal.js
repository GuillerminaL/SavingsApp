function Modal(props) {

    function cancelHandler() {
        props.onCancel();
    }

    function confirmHandler() {
        props.onConfirm();
    }

    return (
        <div className="modal">
            <h2>Sure you wanna delete this?</h2>
            <button className="btn" onClick={cancelHandler}>Cancel</button>
            <button className="btn" onClick={confirmHandler}>Confirm</button>
        </div>
    );
}

export default Modal;