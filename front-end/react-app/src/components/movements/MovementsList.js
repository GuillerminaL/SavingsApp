import MovementItem from './MovementItem';
import classes from './css/MovementsList.module.css';

function MovementsList(props) {
  return (
    <ul className={classes.list}>
      {props.movements.map((movement) => (
        <MovementItem
          key={movement.id}
          id={movement.id}
          savingId={movement.savingId}
          currencyId={movement.currencyId}
          concept={movement.concept}
          amount={movement.amount}
          createdAt={movement.createdAt}
        />
      ))}
    </ul>
  );
}

export default MovementsList;