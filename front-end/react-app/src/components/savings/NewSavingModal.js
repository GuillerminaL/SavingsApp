import Modal from '../Modal';
import NewSavingForm from './NewSavingForm';
import classes from './css/NewSavingModal.module.css';

const NewSavingModal = (props) => {
    function cancelHandler() {
        props.onCancel();
    }

    return (
        <Modal title={"New Saving"}>
            <NewSavingForm  className={classes.form} onSubmitSuccess={cancelHandler} />
        </Modal>
    );
}

export default NewSavingModal;