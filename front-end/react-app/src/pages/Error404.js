const Error404 = () => {
    return (
        <section className='main-section'>
            <div className="w-full rounded-lg bg-gray-200 shadow sm:max-w-md md:mt-0 xl:p-0 ">
                <div className="flex flex-col justify-center space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-center text-xl font-semibold text-red-600">404</h1>
                    <h2 className="text-center text-2xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl">Page not found</h2>
                </div>
            </div>
        </section>
    );
}

export default Error404;