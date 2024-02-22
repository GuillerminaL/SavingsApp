import SavingItem from './SavingItem';
import classes from './css/SavingsList.module.css';

function SavingsList(props) {
  return (
    <ul className={classes.list}>
      {props.savings.map((saving) => (
        <SavingItem
          key={saving.id}
          id={saving.id}
          image={saving.image}
          title={saving.title}
          description={saving.description}
          amount={saving.amount}
        />
      ))}
    </ul>
  );
}

export default SavingsList;