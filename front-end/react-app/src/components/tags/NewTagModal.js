import { useNavigate } from 'react-router-dom';

import { API_HOST } from '../../config/index';
import NewTagForm from './NewTagForm';
import classes from './css/NewTagModal.module.css';

function NewTagModal(props) {

    const navigate = useNavigate();

    function cancelHandler() {
        props.onCancel();
    }

    async function addTagHandler(data) {
        try {
            const response = await fetch(`${API_HOST}/tags`, 
            {
                method: 'POST',
                body: JSON.stringify(data),
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
                <h2>New Tag</h2>
                <button className="btn" onClick={cancelHandler}> X </button>
            </div>
            <NewTagForm className={classes.form} onAddTag={addTagHandler} />
        </div>
    );
}

export default NewTagModal;