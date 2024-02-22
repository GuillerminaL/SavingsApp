import { useNavigate } from 'react-router-dom';
import NewSavingForm from "../components/savings/NewSavingForm";

function NewSavingPage() {

    const navigate = useNavigate();

    function addSavingHandler(data) {
        fetch(
            'https://savings-app-b2edb-default-rtdb.firebaseio.com/savings.json',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }
        ).then(() => {
            navigate('/savings');
        });
    }

    return (
        <section>
            <h1>Add New Saving</h1>
            <NewSavingForm onAddSaving={addSavingHandler}></NewSavingForm>
        </section>
    );
}

export default NewSavingPage;