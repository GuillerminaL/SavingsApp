import NewSavingForm from './NewSavingForm';
import classes from './css/NewSavingModal.module.css';

function NewSavingModal(props) {

    function cancelHandler() {
        props.onCancel();
    }

    function addSavingHandler(data) {
        fetch(
            'https://savings-app-b2edb-default-rtdb.firebaseio.com/savings.json',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(() => {
            cancelHandler();
        });
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