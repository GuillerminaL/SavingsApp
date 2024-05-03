const ConfirmDeleteModal = () => {
    const cancelHandler = () => {
        props.onCancel();
    }

    return (
        <div className="z-5000 relative flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-800 p-4  shadow-lg">
            <div className="">
                <div className="flex-auto justify-center p-5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="-m-1 mx-auto flex size-4 items-center text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto flex size-16 items-center text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <h2 className="py-4 text-xl font-bold text-gray-200">Are you sure?</h2>
                    <p className="px-8 text-sm text-gray-500">Do you really want to delete your account?
                    This process cannot be undone</p>
                </div>
                <div className="mt-2  space-x-4 p-3 text-center md:block">
                    <button onClick={(cancelHandler)}
                        className="mb-2 rounded-full border-2 border-gray-600 bg-gray-700 px-5 py-2 text-sm font-medium tracking-wider text-gray-300 shadow-sm transition duration-300 ease-in hover:border-gray-700 hover:bg-gray-800 hover:shadow-lg md:mb-0">
                        Cancel
                    </button>
                    <button onClick={props.onConfirm} className="ml-4 rounded-full border-2 border-green-300 bg-green-400 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm transition duration-300 ease-in hover:border-green-500 hover:bg-green-500 hover:shadow-lg">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;