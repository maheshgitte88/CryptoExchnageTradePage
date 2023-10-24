import React, { useState } from 'react';

function BuySell({ selectedSymbol, selectedPrice }) {
  const [activeSection, setActiveSection] = useState('Spot');
  const [spotBuyAmount, setSpotBuyAmount] = useState(1);
  const [spotSellAmount, setSpotSellAmount] = useState(1);
  const [limitBuyAmount, setLimitBuyAmount] = useState(1);
  const [limitSellAmount, setLimitSellAmount] = useState(1);
  const [takerFee, settakerFee]=useState(0.002)
  const [totalcost, setTotalCost]=useState(0)
  const handleSectionToggle = (section) => {
    setActiveSection(section);
  };

  const handleAmountChange = (section, amount) => {
    if (section === 'Spot') {
      setSpotBuyAmount(amount);
      setSpotSellAmount(amount);
    } else if (section === 'Limit') {
      setLimitBuyAmount(amount);
      setLimitSellAmount(amount);
    }
    setTotalCost(amount* 85)
    settakerFee(amount* 0.002)
  };
  
  return (
    <div className="container border pt-1">
      <ul className="nav nav-tabs">
        <li className="nav-item" onClick={() => handleSectionToggle('Spot')}>
          <a className={`nav-link ${activeSection === 'Spot' ? 'active' : ''}`} href="#spot">
            Spot
          </a>
        </li>
        <li className="nav-item" onClick={() => handleSectionToggle('Limit')}>
          <a className={`nav-link ${activeSection === 'Limit' ? 'active' : ''}`} href="#limit">
            Limit
          </a>
        </li>
      </ul>

      <div className="tab-content">
        {activeSection === 'Spot' && (
          <div className="tab-pane active" id="spot">
            <div className="row">
              <div className="col">
                <form>
                  <div className="mb-3">
                    <label htmlFor="spot-buy-amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder={selectedSymbol}
                      className="form-control"
                      id="spot-buy-amount"
                      value={spotBuyAmount}
                      onChange={(e) => {
                        handleAmountChange('Spot', e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="spot-buy-price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      value={selectedPrice * spotSellAmount}
                      className="form-control"
                      id="spot-buy-price"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Buy
                  </button>
                </form>
              </div>
              <div className="col">
                <form>
                  <div className="mb-3">
                    <label htmlFor="spot-sell-amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder={selectedSymbol}
                      className="form-control"
                      id="spot-sell-amount"
                      value={spotSellAmount}
                      onChange={(e) => {
                        handleAmountChange('Spot', e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="spot-sell-price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      value={selectedPrice * spotSellAmount}
                      className="form-control"
                      id="spot-sell-price"
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Sell
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'Limit' && (
          <div className="tab-pane active" id="limit">
            <div className="row">
              <div className="col">
                <form>
                  <div className="mb-3">
                    <label htmlFor="limit-buy-amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder={selectedSymbol}
                      className="form-control"
                      id="limit-buy-amount"
                      value={limitBuyAmount}
                      onChange={(e) => {
                        handleAmountChange('Limit', e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="limit-buy-price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      value={selectedPrice * limitBuyAmount}
                      className="form-control"
                      id="limit-buy-price"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Buy
                  </button>
                </form>
              </div>
              <div className="col">
                <form>
                  <div className="mb-3">
                    <label htmlFor="limit-sell-amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder={selectedSymbol}
                      className="form-control"
                      id="limit-sell-amount"
                      value={limitSellAmount}
                      onChange={(e) => {
                        handleAmountChange('Limit', e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="limit-sell-price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      value={selectedPrice * limitSellAmount}
                      className="form-control"
                      id="limit-sell-price"
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Sell
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container border mt-1">
      <div className="d-flex justify-content-between">
        <p>Taker Fees (0.002%)</p>
        <p>{takerFee} {selectedSymbol}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Total (excl. fees)</p>
        <p>{selectedPrice * spotBuyAmount ? spotBuyAmount : limitBuyAmount} {selectedSymbol}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Cost</p>
        <p>{totalcost} TUSD</p>
      </div>
    </div>
    </div>
  );
}

export default BuySell;
