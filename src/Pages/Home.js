import { useEffect, useState } from "react";
// import TradingViewWidget from "../Componants/TradingViewWidget";
import axios from "axios";
import { Link } from "react-router-dom";



function Home() {
    const [data, setData] = useState([])


    async function CoinData() {
        try {
            const res = await axios.get('http://13.49.241.141:5000/api/coincurd/coins');
            const resData = res.data;
            setData(resData);

        } catch (error) {
            console.log(error, "error in data Api")
        }

    }

    useEffect(() => {

        CoinData();
    }, [])

    console.log(data, 17)

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Coin</th>
                            <th>Last</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Change (24h)</th>
                            <th>Volume</th>
                            <th>Trade Count</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td><Link to={`coin/${item.coin}`} >{item.coin}</Link></td>
                                <td>{item.last}</td>
                                <td>{item.open}</td>
                                <td>{item.high}</td>
                                <td>{item.low}</td>
                                <td>{item.change24h}</td>
                                <td>{item.volume}</td>
                                <td>{item.TradeCount}</td>
                                <td>{new Date(item.time).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Home;