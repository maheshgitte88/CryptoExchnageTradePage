import React, { useEffect, useRef, useState } from 'react'
import "./ExchangeDashboard.css";
import DepthChart from '../Componants/DepthChart';
import BuySell from '../Componants/BuySell';
import TradingViewChart from './TradingViewChart';
const initialData = [
    { pair: "BTC/USD", price: 45000, change: 2.5 },
    { pair: "ETH/USD", price: 2.000, change: -1.8 },
    { pair: "TRX/USD", price: 0.600, change: 1.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "BTC/USD", price: 45000, change: 2.5 },
    { pair: "ETH/USD", price: 2.000, change: -1.8 },
    { pair: "TRX/USD", price: 0.600, change: 1.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "DOT/USD", price: 0.500, change: -1.1 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "BNB/USD", price: 9.100, change: 3.8 },
    { pair: "XRP/USD", price: 7.000, change: -3.8 },

];

const initialDatatwo = [
    { Price: 29568.99, Amount: 45000, Time: '14:48:45' },
    { Price: 29568.00, Amount: 2.000, Time: '14:48:45' },
    { Price: 295670.7, Amount: 0.600, Time: '14:48:45' },
    { Price: 29567.05, Amount: 0.500, Time: '14:48:45' },
    { Price: 29567.00, Amount: 7.000, Time: '14:48:45' },
    { Price: 29567.00, Amount: 9.100, Time: '14:48:45' },
    { Price: 29567.00, Amount: 0.500, Time: '14:48:45' },
    { Price: 29567.00, Amount: 7.000, Time: '14:48:45' },
    { Price: 29567.00, Amount: 9.100, Time: '14:47:45' },
    { Price: 29567.80, Amount: 9.100, Time: '14:48:45' },
    { Price: 29566.00, Amount: 0.500, Time: '14:46:45' },
    { Price: 29565.70, Amount: 7.000, Time: '14:48:45' },
    { Price: 29565.00, Amount: 9.100, Time: '14:48:45' },
    { Price: 29564.00, Amount: 9.100, Time: '14:45:45' },
    { Price: 29564.50, Amount: 0.500, Time: '14:48:45' },
    { Price: 29564.00, Amount: 7.000, Time: '14:48:45' },
    { Price: 29563.00, Amount: 9.100, Time: '14:48:45' },
];
const ExchangeCoinDashBoard = () => {
    const [data, setData] = useState(initialData);
    const [depth, setDepth] = useState(initialDatatwo)
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const sliderRef = useRef(null);
    const [activeSectionType, setActiveSectionType] = useState('Ask/Bid');
    const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (pair) => {
        const updatedFavorites = favorites.includes(pair)
            ? favorites.filter((fav) => fav !== pair)
            : [...favorites, pair];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };


    const handleRowClick = (symbol) => {
        setSelectedSymbol(symbol);
    };

    const [activeSection, setActiveSection] = useState('trades');
    const handleSectionToggle = (section) => {
        setActiveSection(section);
    };
    const [activeOrderSection, setActiveOrderSection] = useState('tradeOrders');
    const handleOrderSectionToggle = (section) => {
        setActiveOrderSection(section);
    };

    const handlePrev = () => {
        sliderRef.current.scrollLeft -= 200;
    };

    const handleNext = () => {
        sliderRef.current.scrollLeft += 200;
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setData(sortedData);
    };

    const renderOrdersSection = () => {
        if (activeOrderSection === 'tradeOrders') {
            return (
                <div className="Trade-container">
                    <table className="element-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("pair")}>Symbol</th>
                                <th onClick={() => handleSort("price")}>Time</th>
                                <th onClick={() => handleSort("change")}>Order Type</th>
                                <th onClick={() => handleSort("change")}>Filled</th>
                                <th onClick={() => handleSort("change")}>Amount</th>
                                <th onClick={() => handleSort("change")}>Rate</th>
                                <th onClick={() => handleSort("change")}>total Done</th>
                                <th onClick={() => handleSort("change")}>Ststus</th>
                                <th onClick={() => handleSort("change")}>Cancel All</th>
                            </tr>
                        </thead>
                        <tbody className='Trade-container'>
                            {depth.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (activeOrderSection === 'orderHistory') {
            return (
                <div className="Trade-container">
                    <table className="element-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("pair")}>Symbol</th>
                                <th onClick={() => handleSort("pair")}>Order Type</th>
                                <th onClick={() => handleSort("change")}>Filled</th>
                                <th onClick={() => handleSort("change")}>Amount</th>
                                <th onClick={() => handleSort("change")}>Rate</th>
                                <th onClick={() => handleSort("pair")}>Ststus</th>
                                <th onClick={() => handleSort("price")}>Time</th>

                            </tr>
                        </thead>
                        <tbody className='Trade-container'>
                            {depth.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.Price}</td>
                                    <td>{item.Amount}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.Time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    const renderSection = () => {
        if (activeSection === 'trades') {
            return (
                <div className="Trade-container">
                    <table className="element-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                <th onClick={() => handleSort("change")}>Time</th>
                            </tr>
                        </thead>
                        <tbody className='Trade-container'>
                            {depth.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Price}</td>
                                    <td className={item.Amount >= 0 ? "positive" : "negative"}>
                                        {item.Amount}
                                    </td>
                                    <td className={item.change >= 0 ? "positive" : "negative"}>
                                        {item.Time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (activeSection === 'marketDepth') {
            return (
                <div className="MarketDepth-container">
                    <DepthChart />
                </div>
            );
        }
    };

    const renderAskSectionSection = () => {
        if (activeSectionType === 'Ask') {
            return (
                <><div className="askbid-container">
                    <table className="element-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                <th onClick={() => handleSort("change")}>Total(USDT)</th>
                            </tr>
                        </thead>
                        <tbody className='Trade-container'>
                            {depth.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Price}</td>
                                    <td className={item.Amount >= 0 ? "positive" : "negative"}>
                                        {item.Amount}
                                    </td>
                                    <td className={item.change >= 0 ? "negative" : "positive"}>
                                        {item.Time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></>
            );
        } else if (activeSectionType === 'Bid') {
            return (
                <>
                    <div className="askbid-container">
                        <table className="element-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                    <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                    <th onClick={() => handleSort("change")}>Total(USDT)</th>
                                </tr>
                            </thead>
                            <tbody className='Trade-container'>
                                {depth.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Price}</td>
                                        <td className={item.Amount >= 0 ? "positive" : "negative"}>
                                            {item.Amount}
                                        </td>
                                        <td className={item.change >= 0 ? "positive" : "negative"}>
                                            {item.Time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div></>
            );
        } else if (activeSectionType === 'Ask/Bid') {
            return (
                <>
                    <div className="askbid-container">

                        <table className="element-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                    <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                    <th onClick={() => handleSort("change")}>Total(USDT)</th>
                                </tr>
                            </thead>
                            <tbody className='Trade-container'>
                                {depth.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Price}</td>
                                        <td className={item.Amount >= 0 ? "positive" : "negative"}>
                                            {item.Amount}
                                        </td>
                                        <td className={item.change >= 0 ? "positive" : "negative"}>
                                            {item.Time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className='bg-primary-subtle p-2'>


                        </div>
                        <div className="askbid-container">
                            <table className="element-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                        <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                        <th onClick={() => handleSort("change")}>Total(USDT)</th>
                                    </tr>
                                </thead>
                                <tbody className='Trade-container'>
                                    {depth.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Price}</td>
                                            <td className={item.Amount >= 0 ? "positive" : "negative"}>
                                                {item.Amount}
                                            </td>
                                            <td className={item.change >= 0 ? "negative" : "positive"}>
                                                {item.Time}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div></>
            );
        }
    };

    console.log(selectedSymbol, 332)

    return (
        <>
            <div className="container-fluid">

                <div className="row d-flex pt-2 pb-2 fw-bold bg-primary-subtle rounded mt-1 mb-1">
                    <div className="col-6 col-md-2 border border-black p-1 rounded-start">
                        <div className="section">
                            <div className="btn btn-outline-dark fw-bold pt-2">{selectedSymbol}</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-1 border border-black p-1">
                        <div className="section">
                            <div className="section-title">0.6188</div>
                            <div className="section-subtitle">≈ $ 0.62</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-2 border border-black p-1">
                        <div className="section">
                            <div className="section-title">24h Change</div>
                            <div className={`price` >= 0 ? "positive" : "negative"}>-0.0506999 - 7.53%</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-1 border border-black p-1">
                        <div className="section">
                            <div className="section-title">24h High</div>
                            <div className="section-subtitle">0.6758</div>
                        </div>
                    </div>

                    <div className="col-6 col-md-1 border border-black p-1">
                        <div className="section">
                            <div className="">24h Low</div>
                            <div className="section-subtitle">0.6165</div>
                        </div>
                    </div>

                    <div className="col-6 col-md-2 border border-black p-1 rounded-end">
                        <div className="section">
                            <div className=" ">24h Volume</div>
                            <div className="">1,658,286.7</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 border border-black p-1 rounded">
                        <div className="section">

                        </div>
                    </div>
                </div>

                <div className="row rounded">
                    <div className="col-6 col-md-3 bg-light border rounded mt-1 mb-1">
                        <div className="p-2 m-2">
                            {/* <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" /> */}
                            <input type="search" placeholder="Search" className=" order-input " />
                        </div>

                        <div className="element-slider">
                            <button className="slider-button" onClick={handlePrev}>
                                P
                            </button>
                            <div className="slider-container" ref={sliderRef}>
                                <div className="slider-element">Favorite</div>
                                <div className="slider-element">BTC</div>
                                <div className="slider-element">ETH</div>
                                <div className="slider-element">USDT</div>
                                <div className="slider-element">DAI</div>
                                <div className="slider-element">CCT</div>
                                <div className="slider-element">ETH</div>
                                <div className="slider-element">USDT</div>
                                <div className="slider-element">DAI</div>
                                <div className="slider-element">CCT</div>
                                <div className="slider-element">ETH</div>

                            </div>
                            <button className="slider-button" onClick={handleNext}>
                                N
                            </button>
                        </div>
                        <div className="table-container">

                            <table className="element-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort("pair")}>Pair</th>
                                        <th onClick={() => handleSort("price")}>Price</th>
                                        <th onClick={() => handleSort("change")}>Change</th>
                                    </tr>
                                </thead>
                                <tbody className='table-container'>
                                    {data.map((item, index) => (
                                        <tr key={index} onClick={() => handleRowClick(item.pair)}>
                                            <td >  <span
                                                className={`favorite-icon ${favorites.includes(item.pair) ? 'favorite' : ''}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    toggleFavorite(item.pair);
                                                }}
                                            >
                                                &#9733;
                                            </span>{item.pair}</td>
                                            <td className={item.price >= 0 ? 'positive' : 'negative'}>{item.price}</td>
                                            <td className={item.change >= 0 ? 'positive' : 'negative'}>{item.change} %</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex bg-primary-subtle rounded">
                            <div
                                className={`pe-5 p-2 ${activeSection === 'trades' ? 'active' : ''}`}
                                onClick={() => handleSectionToggle('trades')}
                            >
                                <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button"> Trades </a>

                            </div>
                            <div
                                className={`ps-5 p-2 ${activeSection === 'marketDepth' ? 'active' : ''}`}
                                onClick={() => handleSectionToggle('marketDepth')}
                            >
                                <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button"> M-Depth</a>
                            </div>
                        </div>

                        {renderSection()}
                    </div>


                    <div className="col-6 col-md-6 border rounded mt-1 mb-1">
                        <TradingViewChart selectedSymbol={selectedSymbol} />
                        <BuySell />
                    </div>

                    <div className="col-6 col-md-3 bg-light border rounded mt-1 mb-1">
                        <div className='d-flex bg-primary-subtle p-2 rounded'>
                            <div className='ps-2 pe-2'>
                                <a
                                    style={{ fontSize: "12px", fontWeight: "bold" }}
                                    onClick={() => setActiveSectionType('Ask')}
                                >
                                    Ask
                                </a>
                            </div>
                            <div className='ps-2'>
                                <a
                                    style={{ fontSize: "12px", fontWeight: "bold" }}
                                    onClick={() => setActiveSectionType('Bid')}
                                >
                                    Bid
                                </a>
                            </div>
                            <div className='ps-2'>
                                <a
                                    style={{ fontSize: "12px", fontWeight: "bold" }}
                                    onClick={() => setActiveSectionType('Ask/Bid')}
                                >
                                    Ask/Bid
                                </a>
                            </div>
                        </div>
                        {renderAskSectionSection()}
                    </div>


                </div>
                <div className='row mt-1 mb-1'>
                    <div className="d-flex rounded bg-primary-subtle">
                        <div
                            className={`pe-5 p-2 ${activeOrderSection === 'tradeOrders' ? 'active' : ''}`}
                            onClick={() => handleOrderSectionToggle('tradeOrders')}
                        >
                            <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button"> Open Orders </a>
                        </div>
                        <div
                            className={`ps-5 p-2 ${activeOrderSection === 'orderHistory' ? 'active' : ''}`}
                            onClick={() => handleOrderSectionToggle('orderHistory')}
                        >
                            <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button">Order History</a>
                        </div>
                    </div>
                    {renderOrdersSection()}
                </div>
            </div>
        </>

    );

}

export default ExchangeCoinDashBoard;

