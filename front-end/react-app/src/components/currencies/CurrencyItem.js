const CurrencyItem = (props) => {
    return (
        <li className="min-w-6 m-2 flex flex-col p-4 bg-gray-700 border-gray-600 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="flex items-center mr-auto">
                    <div className="inline-flex w-12 h-12">
                        <img className="absolute w-12 h-12 inline-flex border-2 rounded-2xl opacity-75" src={props.image} alt={props.name} />
                    </div>
                    <div className="flex flex-col ml-3">
                        <h2 className="min-w-40 font-medium leading-none text-gray-100">{props.name}</h2>
                        <p className="text-sm uppercase text-gray-500 leading-none mt-1">{props.code}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CurrencyItem;