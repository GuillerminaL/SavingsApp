import classes from './css/Card.module.css';

function Card(props) {
    return (<div className={classes.Card}>{props.children}</div>);
}

export default Card;