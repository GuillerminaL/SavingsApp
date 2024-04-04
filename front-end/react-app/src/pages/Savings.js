import SavingsList from '../components/savings/SavingsList';
import NewSavingHandler from '../components/savings/NewSavingHandler';

const SavingsPage = () => {
    return (
        <section className='main-section'>
            <NewSavingHandler />
            <SavingsList />
        </section>
    );
}

export default SavingsPage;