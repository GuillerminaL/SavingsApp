import { List } from 'flowbite-react';

const MovementItem = (props) => {  
    return (
        <List.Item className='mt-1 flex rounded-md bg-gray-600 p-1 text-sm font-normal leading-none text-gray-400 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-500' >
            <p>{props.createdAt}</p>
            <p className='ml-5 min-w-80 capitalize'>{props.concept}</p>
            <p >$ {props.amount}</p>
        </List.Item>
    );
}

export default MovementItem;