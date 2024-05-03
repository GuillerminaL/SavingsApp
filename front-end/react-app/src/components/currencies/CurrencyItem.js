const CurrencyItem = (props) => {
    return (
        <li className="hover:shodow-lg m-2 flex min-w-6 cursor-pointer flex-col rounded-2xl border-gray-600 bg-gray-700 p-4 shadow-md transition duration-500 ease-in  hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="mr-auto flex items-center">
                    <div className="inline-flex size-12">
                        <img className="absolute inline-flex size-12 rounded-2xl border-2 opacity-75" src={props.image} alt={props.name} />
                    </div>
                    <div className="ml-3 flex flex-col">
                        <h2 className="min-w-40 font-medium leading-none text-gray-100">{props.name}</h2>
                        <p className="mt-1 text-sm uppercase leading-none text-gray-500">{props.code}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CurrencyItem;