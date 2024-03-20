import { useNavigate } from 'react-router-dom';

import { API_HOST } from '../../config/index';
import NewCurrencyForm from './NewCurrencyForm';
import classes from './css/NewCurrencyModal.module.css';

function NewCurrencyModal(props) {

    const navigate = useNavigate();

    function cancelHandler() {
        props.onCancel();
    }

    async function addCurrencyHandler(data) {
        try {
            const response = await fetch(`${API_HOST}/currencies`, 
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });

            const responseData = await response.json();

            alert(responseData.message);
            
            console.log(response.status);
            cancelHandler();
            //refresh
            navigate(0);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div className={classes.modal}>
            <div className={classes.inARowContent}>
                <h2>New Currency</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <NewCurrencyForm className={classes.form} onAddCurrency={addCurrencyHandler} />
        </div>
    );
}

export default NewCurrencyModal;