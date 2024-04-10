const CurrencyConverterHandler = () => {
    return (       
        <form className="max-w-xl mx-auto">
            <div className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse flex items-center flex-col sm:flex-row mb-4">
                <button type="button" className="p-3 text-sm font-medium text-gray-500 focus:outline-none bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-4 h-4" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 10H1m0 0 3-3m-3 3 3 3m1-9h10m0 0-3 3m3-3-3-3"/>
                    </svg>
                    <span className="sr-only">Convert currency</span>
                </button>
                <div className="flex">
                    <label for="crypto-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
                    <div className="relative w-full">
                        <input type="number" id="crypto-input" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="0.323 BTC" required />
                    </div>
                    <button id="dropdown-crypto-button" data-dropdown-toggle="dropdown-crypto" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 16 15"><path fill="#F7931A" d="M14.83 9.204A7.04 7.04 0 111.17 5.797a7.04 7.04 0 0113.66 3.407z"/><path fill="#fff" d="M11.104 6.498c.14-.937-.573-1.44-1.548-1.777l.316-1.269-.773-.192-.308 1.235c-.203-.05-.411-.098-.619-.145l.31-1.244-.771-.193-.317 1.269a25.752 25.752 0 01-.493-.116v-.004l-1.065-.266-.205.825s.573.132.56.14c.314.078.37.285.36.449l-.36 1.446c.022.005.05.013.08.025l-.08-.02-.506 2.026c-.038.095-.135.237-.354.183.008.011-.562-.14-.562-.14l-.383.884 1.005.251c.187.047.37.096.55.142l-.319 1.284.772.192.317-1.27c.21.058.415.11.615.16l-.315 1.264.772.193.32-1.281c1.317.249 2.308.148 2.724-1.043.336-.96-.016-1.513-.71-1.874.505-.116.886-.448.987-1.134zM9.34 8.973c-.239.96-1.854.44-2.378.31l.424-1.7c.524.13 2.203.39 1.954 1.39zm.239-2.49c-.218.874-1.562.43-1.999.321l.385-1.542c.436.109 1.84.312 1.614 1.222z"/></svg>
                        BTC <svg className="w-2.5 h-2.5 ms-2.5" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                    </button>
                    <div id="dropdown-crypto" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" ariaLabelledby="dropdown-crypto-button">
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 16 15"><path fill="#F7931A" d="M14.83 9.204A7.04 7.04 0 111.17 5.797a7.04 7.04 0 0113.66 3.407z"/><path fill="#fff" d="M11.104 6.498c.14-.937-.573-1.44-1.548-1.777l.316-1.269-.773-.192-.308 1.235c-.203-.05-.411-.098-.619-.145l.31-1.244-.771-.193-.317 1.269a25.752 25.752 0 01-.493-.116v-.004l-1.065-.266-.205.825s.573.132.56.14c.314.078.37.285.36.449l-.36 1.446c.022.005.05.013.08.025l-.08-.02-.506 2.026c-.038.095-.135.237-.354.183.008.011-.562-.14-.562-.14l-.383.884 1.005.251c.187.047.37.096.55.142l-.319 1.284.772.192.317-1.27c.21.058.415.11.615.16l-.315 1.264.772.193.32-1.281c1.317.249 2.308.148 2.724-1.043.336-.96-.016-1.513-.71-1.874.505-.116.886-.448.987-1.134zM9.34 8.973c-.239.96-1.854.44-2.378.31l.424-1.7c.524.13 2.203.39 1.954 1.39zm.239-2.49c-.218.874-1.562.43-1.999.321l.385-1.542c.436.109 1.84.312 1.614 1.222z"/></svg>
                                        BTC
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 10 17"><path fill="#343434" d="M5 .5l-.11.364v10.582l.11.105 4.91-2.902L5 .5z"/><path fill="#8C8C8C" d="M5 .5L.086 8.65 5 11.55V.5z"/><path fill="#3C3C3B" d="M5 12.48l-.061.075v3.77L5 16.5l4.914-6.922L5 12.48z"/><path fill="#8C8C8C" d="M5 16.5v-4.02L.086 9.578 5 16.5z"/><path fill="#141414" d="M5 11.55L9.91 8.65 5 6.418v5.133z"/><path fill="#393939" d="M.086 8.649L5 11.551V6.418L.086 8.649z"/></svg>
                                        ETH
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 16 17"><path fill="#C2A633" d="M16 8.5a8 8 0 11-16 0 8 8 0 0116 0z"/><path fill="#fff" fillRule="evenodd" d="M5.355 12.685h2.761S12 13.015 12 8.567c0-4.275-3.546-4.26-4.232-4.257H5.355v3.73H4.38v.914h.974v3.73zM6.91 5.858H8c.407 0 2.458.167 2.461 2.74.003 2.542-2.064 2.54-2.396 2.539H6.91V8.954h1.715v-.913H6.91V5.858z" clipRule="evenodd"/></svg>
                                        DOGE
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 16 13"><g clipPath="url(#clip0_460_40742)"><path fill="url(#paint0_linear_460_40742)" d="M2.599 9.8a.524.524 0 01.37-.152h12.77c.233 0 .35.282.185.447L13.4 12.617a.523.523 0 01-.37.153H.261a.261.261 0 01-.184-.447l2.522-2.522z"/><path fill="url(#paint1_linear_460_40742)" d="M2.599.383a.538.538 0 01.37-.153h12.77c.232 0 .35.282.184.446L13.401 3.2a.523.523 0 01-.37.153H.26a.262.262 0 01-.185-.447L2.599.383z"/><path fill="url(#paint2_linear_460_40742)" d="M13.401 5.062a.523.523 0 00-.37-.153H.261a.262.262 0 00-.184.446l2.522 2.523c.097.096.23.153.37.153h12.77c.233 0 .35-.282.185-.447L13.4 5.062z"/></g><defs><linearGradient id="paint0_linear_460_40742" x1="14.519" x2="5.681" y1="-1.277" y2="15.65" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="paint1_linear_460_40742" x1="10.654" x2="1.817" y1="-3.294" y2="13.633" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><linearGradient id="paint2_linear_460_40742" x1="12.574" x2="3.737" y1="-2.292" y2="14.635" gradientUnits="userSpaceOnUse"><stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/></linearGradient><clipPath id="clip0_460_40742"><path fill="#fff" d="M0 0h16v12.54H0z" transform="translate(0 .23)"/></clipPath></defs></svg>
                                        SOL
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center flex-col sm:flex-row space-y-2 sm:space-y-0">
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">Last update: 20:45 AM, November 20, 2023</p> */}
                <button type="reset" className="text-sm text-blue-700 dark:text-blue-500 inline-flex items-center font-medium hover:underline">
                    Refresh <svg class="w-3 h-3 ms-1.5" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                </button>
            </div>
        </form>

    );
}

export default CurrencyConverterHandler;