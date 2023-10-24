import React, { useEffect, useRef, useState } from 'react'
import "./ExchangeDashboard.css";
import DepthChart from '../Componants/DepthChart';
import BuySell from '../Componants/BuySell';
import TradingViewChart from '../Componants/TradingViewChart';
const initialData = [
    { pair: "BTC/USDT", price: 34500, change: 2.5 },
    { pair: "ETH/USDT", price: 1840, change: -1.8 },
    { pair: "TRX/USDT", price: 0.090, change: 1.8 },
    { pair: "DOT/USDT", price: 4.25, change: -1.1 },
    { pair: "XRP/USDT", price: 0.55, change: -3.8 },
    { pair: "BNB/USDT", price: 230.1, change: 3.8 },
    { pair: "AVA/USDT", price: 0.488, change: -2.3 },
    { pair: "ADA/USDT", price: 0.284, change: 0.5 },
    { pair: "LTC/USDT", price: 69.2, change: -0.7 },
    { pair: "DOGE/USDT", price: 0.0674, change: 4.2 },
    { pair: "SOL/USDT", price: 31.78, change: 5.6 },
    { pair: "UNI/USDT", price: 4.731, change: -2.0 },
    { pair: "LINK/USDT", price: 10.46, change: 1.2 },
    { pair: "MATIC/USDT", price: 0.651, change: -2.8 },
    { pair: "AAVE/USDT", price: 85.32, change: 2.7 },
    { pair: "XLM/USDT", price: 0.114, change: 0.9 },
    { pair: "EOS/USDT", price: 0.596, change: -1.3 },
    { pair: "BCH/USDT", price: 261.2, change: -0.5 },
    { pair: "XTZ/USDT", price: 0.713, change: 2.3 },
    { pair: "ALGO/USDT", price: 0.1010, change: -2.0 },
    { pair: "ATOM/USDT", price: 7.164, change: 3.2 },

];

const initialDatatwo = [
    { Price: 29568.99, Amount: 4.50, Time: '14:48:45' },
    { Price: 29568.00, Amount: 2.000, Time: '14:48:45' },
    { Price: 295670.7, Amount: 0.600, Time: '14:48:45' },
    { Price: 29567.00, Amount: 0.500, Time: '14:48:45' },
    { Price: 29567.05, Amount: 7.000, Time: '14:48:45' },
    { Price: 29567.15, Amount: 9.100, Time: '14:48:45' },
    { Price: 29567.10, Amount: 0.500, Time: '14:48:45' },
    { Price: 29567.20, Amount: 7.000, Time: '14:48:45' },
    { Price: 29567.30, Amount: 9.100, Time: '14:47:45' },
    { Price: 29567.80, Amount: 9.100, Time: '14:48:45' },
    { Price: 29566.90, Amount: 0.500, Time: '14:46:45' },
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
    const [selectedPriceG, setSalectedPrice] = useState('')
    const [favorites, setFavorites] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState();

    const updatePricesForSelectedSymbol = (symbol) => {
        const selectedData = initialData.find((item) => item.pair === symbol);
        if (selectedData) {
            const updatedDatatwo = initialDatatwo.map((item) => ({
                Price: parseFloat((selectedData.price * (1 + (Math.random() * 0.02 - 0.01))).toFixed(4)),
                Amount: parseFloat((Math.random() * 10).toFixed(2)),
                Time: new Date().toLocaleTimeString(),
            }));
            setDepth(updatedDatatwo);
            setSelectedPrice(selectedData.price);
        }
    };

    useEffect(() => {
        updatePricesForSelectedSymbol(selectedSymbol);

        const interval = setInterval(() => {
            updatePricesForSelectedSymbol(selectedSymbol);
        }, 3500);

        return () => {
            clearInterval(interval);
        };
    }, [selectedSymbol]);

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


    const handleRowClick = (symbol, price) => {
        setSelectedSymbol(symbol);
        setSalectedPrice(price);

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
                                    <td>
                                        {item.Amount}
                                    </td>
                                    <td className={item.change >= 0 ? "positive" : "negative"}>
                                        {parseFloat(item.Price * item.Amount).toFixed(4)}
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
                    <DepthChart selectedSymbol={selectedSymbol} />
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
                                    <td>
                                        {item.Amount}
                                    </td>
                                    <td className={item.change >= 0 ? "negative" : "positive"}>
                                        {parseFloat(item.Price * item.Amount).toFixed(4)}
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
                                        <td>
                                            {item.Amount}
                                        </td>
                                        <td className={item.change >= 0 ? "positive" : "negative"}>
                                            {parseFloat(item.Price * item.Amount).toFixed(4)}
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
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="askbid-container">
                                    <table className="element-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                                <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                                <th onClick={() => handleSort("change")}>Total(USDT)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="Trade-container">
                                            {depth.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.Price}</td>
                                                    <td>{item.Amount}</td>
                                                    <td className={item.change >= 0 ? "negative" : "positive"}>
                                                        {parseFloat(item.Price * item.Amount).toFixed(4)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="askbid-container">
                                    <table className="element-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => handleSort("pair")}>Price(USDT)</th>
                                                <th onClick={() => handleSort("price")}>Amount(BTC)</th>
                                                <th onClick={() => handleSort("change")}>Total(USDT)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="Trade-container">
                                            {depth.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.Price}</td>
                                                    <td>{item.Amount}</td>
                                                    <td className={item.change >= 0 ? "positive" : "negative"}>
                                                        {parseFloat(item.Price * item.Amount).toFixed(4)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='row pt-3'>
                            <div className="col-md-12">
                                <img src="https://res.cloudinary.com/daricnizg/image/upload/v1698150815/Mahesh_Gitte_wq6fm5.png" alt="Your Image" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    };

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
                            <div className="section-title">Price</div>
                            <div className="section-subtitle">≈ $ {selectedPriceG}</div>
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
                        <div className="m-1">
                            <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />
                        </div>

                        <div className="element-slider">
                            <button className="slider-button" onClick={handlePrev}>
                                P
                            </button>
                            <div className="slider-container border" ref={sliderRef}>
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
                                        <tr role="button" tabindex="0" key={index} onClick={() => handleRowClick(item.pair, item.price)}>
                                            <td >  <span
                                                className={`favorite-icon ${favorites.includes(item.pair) ? 'favorite' : ''}`}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    toggleFavorite(item.pair);
                                                }}
                                            >
                                                &#9733;
                                            </span>{item.pair}</td>
                                            <td>{item.price}</td>
                                            <td className={item.change >= 0 ? 'positive' : 'negative'}>{item.change} %</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex bg-primary-subtle rounded justify-content-around">
                            <div
                                className={`${activeSection === 'trades' ? 'active' : ''}`}
                                onClick={() => handleSectionToggle('trades')}
                            >
                                <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button"> Trades </a>

                            </div>
                            <div
                                className={`${activeSection === 'marketDepth' ? 'active' : ''}`}
                                onClick={() => handleSectionToggle('marketDepth')}
                            >
                                <a style={{ fontSize: "12px", fontWeight: "bold" }} data-bs-toggle="button"> Depth</a>
                            </div>
                        </div>

                        {renderSection()}
                    </div>


                    <div className="col-6 col-md-6 border rounded mt-1 mb-1">
                        <TradingViewChart selectedSymbol={selectedSymbol} />
                        <BuySell selectedSymbol={selectedSymbol} selectedPrice={selectedPriceG} />
                    </div>

                    <div className="col-6 col-md-3 bg-light border rounded mt-1 mb-1">
                        <div className='d-flex bg-primary-subtle rounded justify-content-around'>
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

