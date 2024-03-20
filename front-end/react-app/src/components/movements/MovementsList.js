import MovementItem from './MovementItem';
import classes from './css/MovementsList.module.css';

function MovementsList(props) {
  return (
    <ul className={classes.list}>
      {props.movements.map((movement) => (
        <MovementItem
          key={movement.id}
          id={movement.id}
          createdAt={movement.createdAt}
          concept={movement.concept}
          amount={movement.amount}
        />
      ))}
    </ul>
  );
}

export default MovementsList;