import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import './Watchlist.css';

function Watchlist(props) {
  const [data, setData] = useState({
    name: props.coin,
    symbol: props.coin,
    price: 0,
    change: 0,
  });
  const [loading, setLoading] = useState(false);

  function priceHandler() {
    axios
      .get(`http://localhost:5000/coin/${props.coin}`)
      .then((res) => {
        console.log(res);
        setData({
          name: res.data.name,
          symbol: res.data.symbol,
          price: (+res.data.priceUsd).toFixed(7),
          change: +res.data.changePercent24Hr,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeCoin() {
    props.changeCoin(data.name.toLowerCase());
  }

  useEffect(() => {
    setLoading(true);
    priceHandler();
  }, [setData]);

  return (
    <div className="watchlist-root">
        <div
          onClick={changeCoin}
          className={`watchlist-container ${data.change > 0 ? 'green' : 'red'}`}
        >
          <div className="watchlist-name-symbol">
            {props.coin.charAt(0).toUpperCase() + props.coin.slice(1)}: {!loading && data.symbol}
          </div>
          {loading ? <BarLoader color="#fff"/> : <div className="watchlist-price">${data.price}</div>}
        </div>
    </div>
  );
}

export default Watchlist;
