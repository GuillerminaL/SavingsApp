import { useNavigate } from 'react-router-dom';

import { deleteData } from '../../data/data';
import Tag from '../icons/Tag';
import UpdateButton from '../buttons/UpdateButton';
import DeleteButton from '../buttons/DeleteButton';

const TagItem = (props) => {
    const navigate = useNavigate();

    async function editTag() {
        //TODO Patch name and description
        console.log("editing " + props.name);
        return;
    }

    async function deleteTag() {
        console.log("deleting " + props.id);
        return;

        const response = await deleteData('tags', props.id);
        if ( response.status === 200 ) {
            alert(response.status, response.message);
            navigate(0);
        } else {
            alert(response.status, response.message);
        }
    }

    return (
        <li className="flex flex-col p-4 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
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
                        <UpdateButton width={'20px'} height={'20px'} onConfirm={editTag} />
                        <DeleteButton width={'20px'} height={'20px'} onConfirm={deleteTag} />
                    </div>
                }
            </div>
        </li>
    );
}

export default TagItem;