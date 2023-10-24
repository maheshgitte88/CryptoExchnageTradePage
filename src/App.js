import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ExchangeCoinDashBoard from './Pages/ExchangeCoinDashBoard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<ExchangeCoinDashBoard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
