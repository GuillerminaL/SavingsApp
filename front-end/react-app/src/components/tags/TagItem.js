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
        <li className="hover:shodow-lg m-2 flex cursor-pointer flex-col rounded-2xl border-gray-600 bg-gray-700 p-4 shadow-md transition duration-500 ease-in  hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="mr-auto flex items-center">
                    <div className="inline-flex size-12">
                        <Tag />
                    </div>
                    <div className="ml-3 flex flex-col">
                        <h2 className="font-medium leading-none text-gray-100">{props.name}</h2>
                        <p className="mt-1 text-sm leading-none text-gray-500">{props.description}</p>
                    </div>
                </div>
                { (props.view !== "simple") &&
                    <div className="flex-no-wrap flex justify-center pt-4 font-medium leading-none text-gray-500">   
                        <EditTagHandler width={'20px'} height={'20px'} id={props.id} currentName={props.name} currentDescription={props.description} />
                        <DeleteButton width={'20px'} height={'20px'} onConfirm={deleteTagHandler} />
                    </div>
                }
            </div>
        </li>
    );
}

export default TagItem;