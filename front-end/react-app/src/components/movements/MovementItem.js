import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import classes from './css/MovementItem.module.css';
import Card from '../ui/card/Card';
import EditIcon from '../icons/Pen';
import TrashIcon from '../icons/Trash';

const MovementItem = (props) => {  
    const navigate = useNavigate();

    async function editCurrency() {
        //TODO Patch name and imageUrl
        console.log("editing " + props.name);
    }

    async function deleteCurrency() {
        const response = await deleteData('currency', props.id);
        alert(response.status, response.message);
        navigate(0);
    }

    return (
        <li>
            <Card>
                <div className={classes.inARowContent}>
                    <div>
                        <p>{props.createdAt}</p>
                        <p>{props.concept}</p>
                        <p>$ {props.amount}</p>
                    </div>
                    <div className={classes.actions}>
                            {/* TODO */}
                            <button onClick={(editCurrency)}>
                                <EditIcon></EditIcon>
                                <p>Edit</p>
                            </button>
                            <button onClick={(deleteCurrency)}>
                                <TrashIcon></TrashIcon>
                                <p>Remove</p>
                            </button>
                    </div>
                </div> 
            </Card>
        </li>
    );
}

export default MovementItem;