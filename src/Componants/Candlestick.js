import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Candlestick = ({symbol} ) => {
  const [candleData, setCandleData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/coincurd/chart/coins/${symbol}`)
      .then(response => {
        const fetchedData = response.data;
        setCandleData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching candlestick data:', error);
      });
  }, [symbol]);

  if (!candleData) {
    return <div>Loading...</div>;
  }
  const series = [
    {
      data: candleData.slice(0,5).map(item => ({
        x: new Date(item.time),
        y: [item.open, item.high, item.low, item.last],
      })),
    },
  ];


console.log(candleData , 33)
  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} width={600} />
    </div>
  );
};

export default Candlestick;
