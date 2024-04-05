import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import Tag from '../icons/Tag';
import DeleteButton from '../buttons/DeleteButton';
import EditTagHandler from './EditTagHandler';

const TagItem = (props) => {
    const navigate = useNavigate();

    async function deleteTagHandler() {
        const response = await deleteData('tags', props.id);
        alert(response.message);
        navigate(0);
    }

    return (
        <li className="flex flex-col m-2 p-4 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="flex items-center mr-auto">
                    <div className="inline-flex w-12 h-12">
                        <Tag />
                    </div>
                    <div className="flex flex-col ml-3">
                        <h2 className="font-medium leading-none text-gray-100">{props.name}</h2>
                        <p className="text-sm text-gray-500 leading-none mt-1">{props.description}</p>
                    </div>
                </div>
                { (props.view !== "simple") &&
                    <div className="flex justify-center flex-no-wrap pt-4 font-medium leading-none text-gray-500">   
                        <EditTagHandler width={'20px'} height={'20px'} id={props.id} currentName={props.name} currentDescription={props.description} />
                        <DeleteButton width={'20px'} height={'20px'} onConfirm={deleteTagHandler} />
                    </div>
                }
            </div>
        </li>
    );
}

export default TagItem;