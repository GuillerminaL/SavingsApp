const Error404 = () => {
    return (
        <section className='main-section'>
            <div className="w-full bg-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="flex flex-col justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center text-xl font-semibold text-red-600">404</h1>
                    <h2 className="text-center text-2xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl">Page not found</h2>
                </div>
            </div>
        </section>
    );
}

export default Error404;