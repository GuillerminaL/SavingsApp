const Backdrop = ({ onClick }) => {
    return (
        <div className="fixed w-full h-screen left-0 z-5000 bg-black/75" onClick={onClick}/>
    );
}

export default Backdrop;