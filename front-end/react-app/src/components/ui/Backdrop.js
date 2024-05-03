const Backdrop = ({ onClick }) => {
    return (
        <div className="z-5000 fixed left-0 h-screen w-full bg-black/75" onClick={onClick}/>
    );
}

export default Backdrop;