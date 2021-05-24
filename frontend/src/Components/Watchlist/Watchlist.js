import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import './Watchlist.css';

function Watchlist(props) {
  const [data, setData] = useState({
    name: props.coin,
    symbol: "",
    price: 0,
    change: 0,
  });
  const [loading, setLoading] = useState(false);

  function priceHandler() {
    axios
      .get(`http://localhost:5000/coin/${props.coin}`)
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
        console.log(err);
      });
  }

  function changeCoin() {
    props.changeCoin(data.symbol.toLowerCase());
  }

  useEffect(() => {
    setLoading(true);
    priceHandler();
  }, [setData]);

  return (
    <div className="watchlist-root">
      <div onClick={changeCoin} className="watchlist-container">
        <div className="watchlist-name-symbol">
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
