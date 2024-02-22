import { useNavigate } from 'react-router-dom';

import NewCurrencyForm from './NewCurrencyForm';
import classes from './css/NewCurrencyModal.module.css';

function NewCurrencyModal(props) {

    const navigate = useNavigate();

    function cancelHandler() {
        props.onCancel();
    }

    function addCurrencyHandler(data) {
        fetch(
            'https://savings-app-b2edb-default-rtdb.firebaseio.com/currencies.json',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(() => {
            cancelHandler();
            navigate('/');
        });
    }

    return (
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>New Currancy</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <NewCurrencyForm className={classes.form} onAddCurrency={addCurrencyHandler} />
        </div>
    );
}

export default NewCurrencyModal;