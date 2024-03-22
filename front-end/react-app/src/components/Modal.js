const Modal = (props) => {
    const { title, children } = props;

    const cancelHandler = () => {
        props.onCancel();
    }

    return (
        <div className="modal">
            <div className="inARowContent">
                <h2>{title}</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            {children}
        </div>
    );
}

export default Modal;