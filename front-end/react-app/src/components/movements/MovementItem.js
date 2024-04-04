import { List } from 'flowbite-react';

const MovementItem = (props) => {  
    return (
        <List.Item className='flex text-sm text-gray-400 font-normal leading-none mt-1 p-1 bg-gray-600 rounded-md hover:bg-gray-200 hover:text-gray-500 transition ease-in-out duration-300' >
            <p>{props.createdAt}</p>
            <p className='min-w-80 ml-5 capitalize'>{props.concept}</p>
            <p >$ {props.amount}</p>
        </List.Item>
    );
}

export default MovementItem;