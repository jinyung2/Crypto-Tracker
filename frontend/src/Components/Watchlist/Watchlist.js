import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import './Watchlist.css';
import { user } from '../../Api/User';

function Watchlist(props) {
  const [data, setData] = useState({
    name: props.coin,
    symbol: "",
    price: 0,
    change: 0,
  });
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  function priceHandler() {
    user.getCoin(props.coin)
      .then((res) => {
        setData({
          name: res.data.name,
          symbol: res.data.symbol,
          price: (+res.data.priceUsd).toFixed(4),
          change: +res.data.changePercent24Hr,
        });
        setLoading(false);
      })
      .catch((err) => {
        setRetryCount(retryCount + 1);
        console.log(err);
      });
  }

  function changeCoin() {
    props.changeCoin(data.symbol.toLowerCase());
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  }

  useEffect(() => {
    setLoading(true);
    if (loading && retryCount < 3) {
      priceHandler();
    }
  }, [retryCount]);

  return (
    <div 
    className="watchlist-root" 
    ref={props.innerRef}>
      <div 
      onClick={changeCoin} 
      className="watchlist-container"
      >
        <div 
        className="watchlist-name-symbol"
        >
          {props.coin.charAt(0).toUpperCase() + props.coin.slice(1)}:{' '}
          {!loading && data.symbol}
        </div>
        {loading ? (
          <BarLoader color="#fff" />
        ) : (
          <div
            className={`watchlist-price ${data.change > 0 ? 'green' : 'red'}`}
          >
            ${data.price}
          </div>
        )}
      </div>
      <button onClick={() => props.remove(props.coin)} className="watchlist-button">X</button>
    </div>
  );
}

export default Watchlist;
