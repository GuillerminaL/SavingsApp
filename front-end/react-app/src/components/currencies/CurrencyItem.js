import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import UpdateButton from '../buttons/UpdateButton';
import DeleteButton from '../buttons/DeleteButton';

const CurrencyItem = (props) => {
    const navigate = useNavigate();

    async function editCurrency() {
        //TODO Patch name and imageUrl
        console.log("editing " + props.name);
    }

    async function deleteCurrency() {
        console.log(props.id);
        return;
        const response = await deleteData('currencies', props.id);
        alert(response.status, response.message);
        navigate(0);
    }

    return (
        <li className="flex flex-col p-4 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="flex items-center mr-auto">
                    <div className="inline-flex w-12 h-12">
                        <img className="absolute w-12 h-12 inline-flex border-2 rounded-2xl opacity-75" src={props.image} alt={props.name} />
                    </div>
                    <div className="flex flex-col ml-3">
                        <h2 className="font-medium leading-none text-gray-100">{props.name}</h2>
                        <p className="text-sm uppercase text-gray-500 leading-none mt-1">{props.code}</p>
                    </div>
                </div>
                <div className="flex justify-center flex-no-wrap pt-4 font-medium leading-none text-gray-500">   
                    <UpdateButton width={'20px'} height={'20px'} onConfirm={editCurrency} />
                    <DeleteButton width={'20px'} height={'20px'} onConfirm={deleteCurrency} />
                </div>
            </div>
        </li>
    );
}

export default CurrencyItem;