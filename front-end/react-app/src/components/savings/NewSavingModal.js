import { API_HOST } from '../../config/index';
import NewSavingForm from './NewSavingForm';
import classes from './css/NewSavingModal.module.css';

function NewSavingModal(props) {

    function cancelHandler() {
        props.onCancel();
    }

    async function addSavingHandler(data) {
        try {
            const response = await fetch(`${API_HOST}/savings`, 
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
            console.log(response.status);
            cancelHandler();
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>New Saving</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <NewSavingForm className={classes.form} onAddSaving={addSavingHandler} />
        </div>
    );
}

export default NewSavingModal;