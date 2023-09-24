import React, { useState } from 'react'

function BuySell() {
    const [activeSection, setActiveSection] = useState('Spot');
    const handleSectionToggle = (section) => {
        setActiveSection(section);
    };
    const containerStyle = {
        background: 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)'
    };
    const renderSection = () => {
        if (activeSection === 'Spot') {
            return (
                <>
                    <div id="spot">
                        <div className="grid grid-cols-2 gap-5">
                            <form className="space-y-5 text-center">
                                <label className=" order-label text-black peer"><span>Amount </span>
                                    <div className="group relative">
                                        <input type="range" min="0" max="100" step="1" className="w-full" style={containerStyle} />
                                        <div className="mt-1 flex w-full justify-between px-1">
                                            <button className="order-btn bg-gray-900 dark:bg-gray-50" type="button"></button><button
                                                className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                    className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                        className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                            className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                        </div>
                                        <div className="hidden bg-primary absolute origin-bottom scale-y-0 rounded-md py-1 px-2 text-xs transition-transform duration-200 ease-in group-hover:scale-100"
                                            style={{ top: "-30px", left: "-10%" }}>
                                            0%
                                        </div>
                                    </div>
                                </label>
                                <div className="flex">
                                    <input type="number" className="MarketBuy order-input disabled:opacity-50" /><span
                                        className="order-span"><button type="button"
                                            className="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-up-fill"></i></button><button type="button"
                                                className="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-down-fill"></i></button></span><span className="order-span-2">
                                        BTC</span>
                                </div>
                                <div disabled="true">
                                    <label  className=" order-label text-black peer"><span>Cost</span><span>Taker Fee: <span
                                        className="text-warning">0.03%</span></span></label>
                                    <div className="flex">
                                        <input type="number" className="order-input" /><span className="order-span-2">USDT</span>
                                    </div>
                                </div>
                                <a href="/app"><button
                                    className="text-green-700 border-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800 hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600 px-3 py-1.5 w-full mt-5 text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800 hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600 text-sm px-3 py-1.5 w-full mt-5 marketType"
                                    id="marketOrderBtnBuy" type="button">
                                    <span >Buy</span>
                                </button></a>
                            </form>


                            <form className="space-y-5 text-center" >
                                <label  className=" order-label text-black peer"><span>Amount </span>
                                    <div className="group relative">
                                        <input type="range" min="0" max="100" step="1" className="w-full" style={containerStyle} />
                                        <div className="mt-1 flex w-full justify-between px-1">
                                            <button className="order-btn bg-gray-900 dark:bg-gray-50" type="button"></button><button
                                                className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                    className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                        className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                            className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                        </div>
                                        <div className="hidden bg-primary absolute origin-bottom scale-y-0 rounded-md py-1 px-2 text-xs transition-transform duration-200 ease-in group-hover:scale-100"
                                            style={{ top: "-30px", left: "-10%" }}>
                                            0%
                                        </div>
                                    </div>
                                </label>
                                <div className="flex">
                                    <input type="number" className="MarketSell order-input disabled:opacity-50" min="0.00001"
                                        max="10000000000" step="0.00001"
                                    /><span className="order-span"><button
                                        type="button"
                                        className="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                        <i className="bi bi-caret-up-fill"></i></button><button type="button"
                                            className="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-down-fill"></i></button></span><span className="order-span-2">
                                        BTC</span>
                                </div>

                                <div disabled="true">
                                    <label  className=" order-label text-black peer"><span>Cost</span><span>Maker Fee: <span
                                        className="text-warning">0.03%</span></span></label>
                                    <div className="flex">
                                        <input type="number" className="order-input" disabled=""
                                        /><span className="order-span-2">USDT</span>
                                    </div>
                                </div>
                                <a href="/app">
                                    <button
                                        className="text-red-700 border-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900 hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600 px-3 py-1.5 w-full mt-5 text-red-700 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900 hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600 text-sm px-3 py-1.5 w-full mt-5 marketType"
                                        id="marketOrderBtnSell" type="button">
                                        <span >Sell</span>
                                    </button>
                                </a>
                            </form>
                        </div>
                    </div>
                </>
            );
        }
        else if (activeSection === "Limit") {
            return (
                <>
                    <div id="limit" >
                        <div className="grid grid-cols-2 gap-5">
                            <form className="space-y-5 text-center">
                                <label  className=" order-label text-black peer">
                                    <span>Price</span><a className="text-warning">Best Ask</a></label>
                                <div className="flex">
                                    <input id="price" type="number" className="priceNowAsk order-input disabled:opacity-50"
                                        placeholder="Price" />
                                    <span className="order-span-2">USDT</span>
                                </div>
                                <label  className=" order-label text-black peer"><span>Amount </span>
                                    <div className="group relative">
                                        <input type="range" min="0" max="100" step="1" className="w-full" style={containerStyle} />
                                        <div className="mt-1 flex w-full justify-between px-1">
                                            <button className="order-btn bg-gray-900 dark:bg-gray-50" type="button"></button><button
                                                className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                    className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                        className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button><button
                                                            className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                        </div>
                                        <div className="hidden bg-primary absolute origin-bottom scale-y-0 rounded-md py-1 px-2 text-xs transition-transform duration-200 ease-in group-hover:scale-100"
                                            style={{ top: "-30px", left: "-10%" }}>
                                            0%
                                        </div>
                                    </div>
                                </label>
                                <div className="flex">
                                    <input type="number" className="MarketBuy order-input disabled:opacity-50" min="0.00001"
                                        max="10000000000" step="0.00001" /><span
                                            className="order-span"><button type="button"
                                                className="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-up-fill"></i></button><button type="button"
                                                className="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-down-fill"></i></button></span><span className="order-span-2">
                                        BTC</span>
                                </div>

                                <div disabled="true">
                                    <label  className=" order-label text-black peer"><span>Cost</span><span>Taker Fee: <span
                                        className="text-warning">0.03%</span></span></label>
                                    <div className="flex">
                                        <input type="number" className="order-input" disabled=""
                                        />
                                        <span className="order-span-2">USDT</span>
                                    </div>
                                </div>
                                <a href="/app"><button
                                    className="text-green-700 border-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800 hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600 px-3 py-1.5 w-full mt-5 text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800 hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600 text-sm px-3 py-1.5 w-full mt-5 limitType"
                                    id="limitOrderBtnBuy" type="button">
                                    <span >Buy</span>
                                </button></a>
                            </form>
                            <form className="space-y-5 text-center" >

                                <label  className=" order-label text-black peer"><span>Price</span><a
                                    className="text-warning">Best Bid</a></label>
                                <div className="flex">
                                    <input id="price" type="number" className="priceNowAsk order-input disabled:opacity-50"
                                        min="0.1" step="0.1" placeholder="Price"
                                    /><span className="order-span-2">USDT</span>
                                </div>


                                <label  className=" order-label text-black peer"><span>Amount </span>
                                    <div className="group relative">
                                        <input type="range" min="0" max="100" step="1" className="w-full" style={containerStyle} />
                                        <div className="mt-1 flex w-full justify-between px-1">
                                            <button className="order-btn bg-gray-900 dark:bg-gray-50" type="button"></button>
                                            <button className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                            <button className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                            <button className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                            <button className="order-btn bg-gray-300 dark:bg-gray-500" type="button"></button>
                                        </div>
                                        <div className="hidden bg-primary absolute origin-bottom scale-y-0 rounded-md py-1 px-2 text-xs transition-transform duration-200 ease-in group-hover:scale-100"
                                            style={{ top: "-30px", left: "-10%" }}>
                                            0%
                                        </div>
                                    </div>
                                </label>
                                <div className="flex">
                                    <input type="number" className="MarketSell order-input disabled:opacity-50" min="0.00001"
                                        max="10000000000" step="0.00001" />

                                    <span className="order-span">
                                        <button type="button"
                                            className="border-b border-gray-300 px-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-up-fill"></i>
                                        </button>
                                        <button type="button"
                                            className="px-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700 disabled:opacity-50">
                                            <i className="bi bi-caret-down-fill"></i></button></span><span className="order-span-2">
                                        BTC</span>
                                </div>

                                <div disabled="true">
                                    <label  className=" order-label text-black peer"><span>Cost</span><span>Maker Fee: <span
                                        className="text-warning">0.03%</span></span></label>
                                    <div className="flex">
                                        <input type="number" className="order-input" disabled=""
                                        /><span className="order-span-2">USDT</span>
                                    </div>
                                </div>
                                <a href="/app"><button
                                    className="text-red-700 border-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900 hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600 px-3 py-1.5 w-full mt-5 text-red-700 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900 hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600 text-sm px-3 py-1.5 w-full mt-5 limitType"
                                    id="limitOrderBtnSell" type="button">
                                    <span >Sell</span>
                                </button></a>
                            </form>
                        </div>
                    </div>
                </>
            );
        }
    };


    return (
        <>
            <div className="Order border border-gray-100  shadow dark:border-gray-700 dark:bg-gray-900" >
                <div className="w-full bg-primary-subtle dark:bg-gray-800 p-2" >
                    <ul id="myTab" className="nf flex-cols -mb-px flex overflow-x-hidden text-center">
                        <li role="presentation" className='pe-2' >
                            <button id="spot-tab" classNameName={`inline-block py-2 pl-3 pr-4 text-xs font-medium active-tab
                        ${activeSection === 'Spot' ? 'active' : ''}`} onClick={() => handleSectionToggle('Spot')}
                                type="button" >
                                Spot
                            </button>
                        </li>
                        <li role="presentation" className='ps-2' >
                            <button id="limit-tab" type="button"
                                classNameName={`inline-block py-2 pl-3 pr-4 text-xs font-medium inactive-tab ${activeSection === 'Limit' ? 'active' : ''}`}
                                onClick={() => handleSectionToggle('Limit')}>
                                Limit
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent" style={{backgroundColor:"#f8f9fa"}} className="px-3 py-3">
                    {renderSection()}
                </div>
            </div>
        </>
    )
}

export default BuySell;