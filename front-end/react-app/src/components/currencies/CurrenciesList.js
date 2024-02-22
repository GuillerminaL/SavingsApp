import CurrencyItem from './CurrencyItem';
import classes from './css/CurrenciesList.module.css';

function CurrenciesList(props) {
  return (
    <ul className={classes.list}>
      {props.currencies.map((currency) => (
        <CurrencyItem
          key={currency.id}
          id={currency.id}
          image={currency.image}
          currencyName={currency.currencyName}
          amount={currency.amount}
        />
      ))}
    </ul>
  );
}

export default CurrenciesList;