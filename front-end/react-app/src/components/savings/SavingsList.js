import SavingItem from './SavingItem';
import classes from './css/SavingsList.module.css';

function SavingsList(props) {
  return (
    <ul className={classes.list}>
      {props.savings.map((saving) => (
        <SavingItem
          key={saving.id}
          id={saving.id}
          currencyId={saving.currencyId}
          currencyName={saving.currencyName}
          currencyImage={saving.currencyImage}
          tagId={saving.tagId}
          tagName={saving.tagName}
          tagDescription={saving.tagDescription}
          amount={saving.amount}
        />
      ))}
    </ul>
  );
}

export default SavingsList;