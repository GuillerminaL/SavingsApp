import Card from '../ui/Card';
import classes from './css/MovementItem.module.css';

function MovementItem(props) {   
    return (
        <li>
            <Card>
                <div className={classes.inARowContent}>
                    <p>{props.createdAt}</p>
                    <p>{props.concept}</p>
                    <p>$ {props.amount}</p>
                </div> 
            </Card>
        </li>
    );
}

export default MovementItem;