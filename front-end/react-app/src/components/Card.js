import { useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';

function Card(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function deleteHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
        <div className='card'> 
            <h2>{props.title}</h2>
            <h3>{props.desc}</h3>
            <div className='inline'> 
                <p>{props.amount}</p>
                <button className='btn--alt'>Show/Hide</button>
            </div>
            <div>
                <button className='btn'>Edit</button>
                <button className='btn' onClick={deleteHandler}>Delete</button>
            </div>
            {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
        </div>
    );
}

export default Card;