import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TradingViewWidget from "../Componants/TradingViewWidget";
import Candlestick from "../Componants/Candlestick";

function CoinDashboard() {
    const { symbol } = useParams();
    const [showTVWidget, setShowTVWidget] = useState(false);

    const toggleTVWidget = () => {
        setShowTVWidget(!showTVWidget);
    };

    return (
        <>
            <button onClick={toggleTVWidget}>Show TradingView Widget</button>
            {showTVWidget && <TradingViewWidget symbol={symbol} />}
            <Candlestick symbol={symbol} />
        </>
    );
}

export default CoinDashboard;
