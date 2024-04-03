import classes from './css/HomePage.module.css';
import Section from '../components/layouts/Section';
import SavingsList from '../components/savings/SavingsList';
import NewSavingForm from '../components/savings/NewSavingForm';

const SavingsPage = () => {
    return (
        <Section buttonText={"+ New Saving"} modalTitle={"New Saving"} form={<NewSavingForm  className={classes.form} />}>
            <SavingsList />
        </Section>
    );
}

export default SavingsPage;