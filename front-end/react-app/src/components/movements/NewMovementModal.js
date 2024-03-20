import { useNavigate } from 'react-router-dom';

import { API_HOST } from '../../config/index';
import NewMovementForm from './NewMovementForm';
import classes from './css/NewMovementModal.module.css';

function NewMovementModal(props) {

    const navigate = useNavigate();

    function cancelHandler() {
        props.onCancel();
    }

    async function addMovementHandler(data) {
        const newMovement = {
            currencyId: props.saving.currencyId,
            savingId: props.saving.id,
            concept: data.concept,
            amount: data.amount
        };
        try {
            const response = await fetch(`${API_HOST}/movements`,
            {
                method: 'POST',
                body: JSON.stringify(newMovement),
                headers: {'Content-Type': 'application/json'}
            });
            const responseData = await response.json();
            alert(responseData.message);
            cancelHandler();
            navigate(0);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>New Movement</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <div className={classes.control}>
                <h3>Saving: {props.saving.tagName}</h3>
                <h3>Currency: {props.saving.currencyName}</h3>
            </div>
            <NewMovementForm className={classes.form} props={props} onAddMovement={addMovementHandler} />
        </div>
    );
}

export default NewMovementModal;