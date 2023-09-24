import React, { useEffect, useRef } from 'react';
let tvScriptLoadingPromise;

export default function TradingViewChart({ selectedSymbol }) {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }
            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_9154e') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        width: '100%',
                        height: '410',
                        symbol: `${selectedSymbol}`,
                        interval: "D",
                        timezone: "Etc/UTC",
                        theme: "light",
                        style: "1",
                        locale: "in",
                        enable_publishing: true,
                        withdateranges: true,
                        hide_side_toolbar: false,
                        allow_symbol_change: true,
                        container_id: "tradingview_9154e"
                    });
                }
            }
        },
        [selectedSymbol]
    );
    console.log(selectedSymbol, 54)
    return (
        <div className='tradingview-widget-container'>
            <div id='tradingview_9154e' />
            <div className="tradingview-widget-copyright">
                <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
            </div>
        </div>
    );
}
