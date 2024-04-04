import SavingsList from '../components/savings/SavingsList';
import NewSavingHandler from '../components/savings/NewSavingHandler';
import TagsList from '../components/tags/TagsList';

const HomePage = () => {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        
                <section className="flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                    <NewSavingHandler />
                    <SavingsList view={"simple"}/>
                </section>
            
                <section className="flex flex-col p-4 relative items-center bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl">
                    <TagsList view={"simple"} />
                </section>

        </div>
    );
}

export default HomePage;
