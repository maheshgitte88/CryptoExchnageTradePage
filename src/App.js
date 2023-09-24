import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import CoinDashboard from './Pages/CoinDashboard';
import ExchangeCoinDashBoard from './Pages/ExchangeCoinDashBoard';
import Table from './Componants/Table';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/coin/:symbol" element={<CoinDashboard />} />
      <Route exact path='/exchange' element={<ExchangeCoinDashBoard />} />
      <Route exact path='/table' element={<Table />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
