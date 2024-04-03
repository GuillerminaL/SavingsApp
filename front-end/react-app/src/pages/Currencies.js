import classes from './css/HomePage.module.css';
import Section from '../components/layouts/Section';
import CurrenciesList from '../components/currencies/CurrenciesList';
import NewCurrencyForm from '../components/currencies/NewCurrencyForm';

const CurrenciesPage = () => {
    return (
        <Section buttonText={"+ New Currency"} modalTitle={"New Currency"} form={<NewCurrencyForm  className={classes.form} />}>
            <CurrenciesList />
        </Section>
    );
}

export default CurrenciesPage;
