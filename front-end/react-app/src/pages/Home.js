import SavingsList from '../components/savings/SavingsList';
import NewSavingHandler from '../components/savings/NewSavingHandler';
import TagsList from '../components/tags/TagsList';

const HomePage = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-800 p-4  shadow-lg">
                <NewSavingHandler />
                <SavingsList view={"simple"}/>
            </section>
            <section className="relative flex flex-col items-center rounded-2xl border border-gray-800 bg-gray-800 p-4  shadow-lg">
                <TagsList view={"simple"} />
            </section>
        </div>
    );
}

export default HomePage;
