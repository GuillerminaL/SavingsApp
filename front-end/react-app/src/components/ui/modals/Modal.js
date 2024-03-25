import classes from './css/Modal.module.css';

const Modal = (props) => {
    const { title, children } = props;

    const cancelHandler = () => {
        props.onCancel();
    }

    return (
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>{title}</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            {children}
        </div>
    );
}

export default Modal;